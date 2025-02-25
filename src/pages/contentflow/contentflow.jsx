// ContentFlow.jsx
import React, { useState, useEffect } from "react";

const API_URL = "http://127.0.0.1:8000";

export const ContentFlow = () => {
  // State to store extracted PDF text from upload
  const [pdfText, setPdfText] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  // States for endpoint responses
  const [summary, setSummary] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [chatAnswer, setChatAnswer] = useState(null);
  const [chatQuery, setChatQuery] = useState("");

  // Loading and error states for various endpoints
  const [loading, setLoading] = useState({
    upload: false,
    summary: false,
    audio: false,
    video: false,
    chat: false,
  });
  const [error, setError] = useState({
    summary: null,
    audio: null,
    video: null,
    chat: null,
  });

  // Handle PDF file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading((prev) => ({ ...prev, upload: true }));
    setUploadError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_URL} / upload_pdf /`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to upload PDF");
      const data = await response.json();
      setPdfText(data.text);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setLoading((prev) => ({ ...prev, upload: false }));
    }
  };

  // When pdfText is available, call the endpoints
  useEffect(() => {
    if (!pdfText) return;

    // Fetch summary
    const fetchSummary = async () => {
      setLoading((prev) => ({ ...prev, summary: true }));
      try {
        const response = await fetch(`${API_URL} / summarize`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pdf_text: pdfText }),
        });
        if (!response.ok) throw new Error("Failed to fetch summary");
        const data = await response.json();
        setSummary(data.summary);
      } catch (err) {
        setError((prev) => ({ ...prev, summary: err.message }));
      } finally {
        setLoading((prev) => ({ ...prev, summary: false }));
      }
    };

    // Fetch audio narration
    const fetchAudio = async () => {
      setLoading((prev) => ({ ...prev, audio: true }));
      try {
        const response = await fetch(`${API_URL} / text_to_audio`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pdf_text: pdfText }),
        });
        if (!response.ok) throw new Error("Failed to fetch audio");
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } catch (err) {
        setError((prev) => ({ ...prev, audio: err.message }));
      } finally {
        setLoading((prev) => ({ ...prev, audio: false }));
      }
    };

    // Fetch video
    const fetchVideo = async () => {
      setLoading((prev) => ({ ...prev, video: true }));
      try {
        const response = await fetch(`${API_URL} / text_to_video`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pdf_text: pdfText }),
        });
        if (!response.ok) throw new Error("Failed to fetch video");
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      } catch (err) {
        setError((prev) => ({ ...prev, video: err.message }));
      } finally {
        setLoading((prev) => ({ ...prev, video: false }));
      }
    };

    fetchSummary();
    fetchAudio();
    fetchVideo();
  }, [pdfText]);

  // Chat submission
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatQuery || !pdfText) return;
    setLoading((prev) => ({ ...prev, chat: true }));
    try {
      const response = await fetch(`${API_URL} / chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pdf_text: pdfText, question: chatQuery }),
      });
      if (!response.ok) throw new Error("Failed to fetch chat answer");
      const data = await response.json();
      setChatAnswer(data.answer);
    } catch (err) {
      setError((prev) => ({ ...prev, chat: err.message }));
    } finally {
      setLoading((prev) => ({ ...prev, chat: false }));
    }
  };

  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Upload Your PDF & Interact with AI
      </h1>

      {/* PDF Upload Section */}
      <div className="p-4 border rounded-lg shadow">
        <label className="block mb-2 font-semibold">
          Upload PDF File:
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="border p-2 w-full"
        />
        {loading.upload && <p className="text-blue-600 mt-2">Uploading...</p>}
        {uploadError && <p className="text-red-600 mt-2">{uploadError}</p>}
      </div>

      {/* Display extracted PDF text */}
      {pdfText && (
        <div className="p-4 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Extracted PDF Text:</h2>
          <textarea
            className="w-full border p-2 rounded"
            rows="6"
            value={pdfText}
            readOnly
          ></textarea>
        </div>
      )}

      {/* Summary Section */}
      {pdfText && (
        <section className="p-4 border rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          {loading.summary ? (
            <p>Loading summary...</p>
          ) : error.summary ? (
            <p className="text-red-600">{error.summary}</p>
          ) : (
            <pre className="whitespace-pre-wrap">{summary}</pre>
          )}
        </section>
      )}

      {/* Audio Section */}
      {pdfText && (
        <section className="p-4 border rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Audio Narration</h2>
          {loading.audio ? (
            <p>Loading audio...</p>
          ) : error.audio ? (
            <p className="text-red-600">{error.audio}</p>
          ) : audioUrl ? (
            <audio controls src={audioUrl} className="w-full"></audio>
          ) : null}
        </section>
      )}

      {/* Video Section */}
      {pdfText && (
        <section className="p-4 border rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Animated Video</h2>
          {loading.video ? (
            <p>Loading video...</p>
          ) : error.video ? (
            <p className="text-red-600">{error.video}</p>
          ) : videoUrl ? (
            <video controls width="100%" src={videoUrl}></video>
          ) : null}
        </section>
      )}

      {/* Chat Section */}
      {pdfText && (
        <section className="p-4 border rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Chat with PDF</h2>
          <form onSubmit={handleChatSubmit} className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <input
              type="text"
              placeholder="Enter your question..."
              value={chatQuery}
              onChange={(e) => setChatQuery(e.target.value)}
              className="border p-2 rounded flex-1"
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Ask
            </button>
          </form>
          {loading.chat ? (
            <p>Loading chat answer...</p>
          ) : error.chat ? (
            <p className="text-red-600">{error.chat}</p>
          ) : chatAnswer ? (
            <div className="p-4 bg-gray-100 rounded">
              <strong>Answer:</strong>
              <p>{chatAnswer}</p>
            </div>
          ) : null}
        </section>
      )}
    </div>
  );
};

export default ContentFlow;