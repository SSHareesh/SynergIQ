from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import FileResponse, JSONResponse
from fastapi import Body
import PyPDF2
import tempfile
import os
import cv2
import numpy as np
from gtts import gTTS
from PIL import Image, ImageDraw, ImageFont
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain import PromptTemplate
from langchain.llms import Cohere
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain.embeddings import CohereEmbeddings
from dotenv import load_dotenv
from langchain_community.llms import Cohere
from fastapi.middleware.cors import CORSMiddleware


# Load API Key
load_dotenv()
api_key = os.getenv('COHERE_API_KEY')

app = FastAPI()

# Store Chat History
chat_histories = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Function to extract text from PDF
def extract_text_from_pdf(file_path):
    text = ""
    with open(file_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            extracted_text = page.extract_text()
            if extracted_text:
                text += extracted_text + "\n"
    return text.strip()

# Function to convert text to speech (TTS)
def text_to_audio(text):
    tts = gTTS(text[:5000], lang="en")  # gTTS limit
    temp_audio = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
    tts.save(temp_audio.name)
    return temp_audio.name

# Function to create a scrolling text video
def text_to_animated_video(text):
    temp_video = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
    width, height, fps, duration = 1280, 720, 30, 10
    out = cv2.VideoWriter(temp_video.name, cv2.VideoWriter_fourcc(*'mp4v'), fps, (width, height))

    try:
        font = ImageFont.truetype("arial.ttf", 40)
    except IOError:
        font = ImageFont.load_default()

    words = text.split()
    lines = [" ".join(words[i:i+10]) for i in range(0, min(len(words), 100), 10)]
    full_text = "\n".join(lines)

    for i in range(fps * duration):
        img = Image.new("RGB", (width, height), "black")
        draw = ImageDraw.Draw(img)
        y_position = height - int(i * (height / (fps * duration)))
        draw.text((50, y_position), full_text, font=font, fill="white")
        frame = np.array(img)
        out.write(cv2.cvtColor(frame, cv2.COLOR_RGB2BGR))

    out.release()
    return temp_video.name

# Function to summarize PDF content
def summarize_text(text):
    splitter = RecursiveCharacterTextSplitter(chunk_size=3000, chunk_overlap=500)
    chunks = splitter.split_text(text)

    summarizer = Cohere(model="command-light", cohere_api_key=api_key)
    chunk_summaries = [summarizer(f"Summarize this text:\n\n{chunk}") for chunk in chunks]

    final_summary = summarizer(f"Combine these summaries into a 4-5 page detailed summary:\n\n{''.join(chunk_summaries)}")
    return final_summary

# ----------------------
# API ENDPOINTS
# ----------------------

@app.post("/upload_pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    temp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    temp_pdf.write(await file.read())
    temp_pdf.close()

    pdf_text = extract_text_from_pdf(temp_pdf.name)
    filename = os.path.basename(temp_pdf.name)  # Extract filename

    return {"text": pdf_text, "filename": filename}  # Ensure 'filename' is returned


@app.post("/summarize/")
async def summarize(payload: dict = Body(...)):
    pdf_text = payload.get("pdf_text", "")
    if not pdf_text:
        return JSONResponse(status_code=400, content={"error": "Invalid PDF text"})
    summary = summarize_text(pdf_text)
    return {"summary": summary}


@app.post("/text_to_audio/")
async def text_to_audio_api(payload: dict = Body(...)):
    pdf_text = payload.get("pdf_text", "")
    if not pdf_text:
        return JSONResponse(status_code=400, content={"error": "Invalid PDF text"})
    audio_path = text_to_audio(pdf_text)
    return FileResponse(audio_path, media_type="audio/mp3", filename="pdf_audio.mp3")

@app.post("/text_to_video/")
async def text_to_video_api(payload: dict = Body(...)):
    pdf_text = payload.get("pdf_text", "")
    if not pdf_text:
        return JSONResponse(status_code=400, content={"error": "Invalid PDF text"})
    video_path = text_to_animated_video(pdf_text)
    return FileResponse(video_path, media_type="video/mp4", filename="animated_pdf_video.mp4")


@app.post("/chat/")
async def chat_with_pdf(pdf_text: str, question: str):
    if pdf_text not in chat_histories:
        chat_histories[pdf_text] = []

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1200, chunk_overlap=250)
    chunks = text_splitter.split_text(question)
    embeddings = CohereEmbeddings(cohere_api_key=api_key)
    db = FAISS.from_texts(chunks, embeddings)
    retriever = db.as_retriever(search_type="mmr", search_kwargs={"k": 10})

    prompt = PromptTemplate(
        template="You are a helpful assistant answering queries about the PDF.\n{question}",
        input_variables=["question"]
    )
    llm = Cohere(cohere_api_key=api_key)
    memory = ConversationBufferMemory(output_key="answer", memory_key="chat_history", return_messages=True)
    chain = ConversationalRetrievalChain.from_llm(llm=llm, memory=memory, retriever=retriever)

    result = chain({"question": question, "chat_history": chat_histories[pdf_text]})
    chat_histories[pdf_text].append((question, result["answer"]))

    return {"answer": result["answer"]}

# Run the FastAPI Server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
