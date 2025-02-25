import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import HomePage from './pages/home/HomePage.jsx';
import Profiling from "./pages/profiling/profiling";
import Roadmaps from './pages/roadmaps/roadmaps.jsx';
import BackendRoadmap from "./pages/roadmaps/backend.jsx";
import Rewards from "./pages/rewards/rewards.jsx";
import { RewardProvider } from './context/RewardContext';
import LearnHub from './pages/learnhub/learnhub.jsx';
import ThozhaPage from './pages/thozha/thozha.jsx';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profiling" element={<Profiling />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/backend-roadmap" element={<RewardProvider><BackendRoadmap /></RewardProvider>} />
          <Route path="/rewards" element={<RewardProvider><Rewards /></RewardProvider>} />
          <Route path="/learn-hub" element={<LearnHub />} />
          <Route path="/thozha" element={<ThozhaPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;