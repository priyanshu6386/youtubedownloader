import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import VideoPlayer from './components/VideoPlayer';
import DownloadOptions from './components/DownloadOptions';

function App() {
  const [videoId, setVideoId] = useState('');
  const [submitted, setSubmitted] = useState('');

  // extract 11‑char ID even if a full URL is pasted
  const extractId = (input) => {
    const m = input.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return m ? m[1] : input;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = extractId(videoId.trim());

    if (!id || id.length !== 11) {
      toast.error('Please enter a valid YouTube video ID or URL 🚨', {
        position: 'top-center',
      });
      return;
    }
    setSubmitted(id);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
      <ToastContainer theme="dark" />
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center mb-6 drop-shadow-lg">
          🎬 YouTube Downloader
        </h1>

        {/* Search box */}
        <form onSubmit={handleSubmit} className="mb-6 space-y-3">
          <input
            type="text"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            placeholder="Paste YouTube video URL or ID"
            className="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-300 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white font-bold py-2 rounded-lg hover:scale-105 transition-transform shadow-lg"
          >
            🚀 Load Video
          </button>
        </form>

        {submitted && (
          <>
            <VideoPlayer videoId={submitted} />
            <DownloadOptions videoId={submitted} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
