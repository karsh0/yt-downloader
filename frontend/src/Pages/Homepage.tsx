import { useState } from "react";
import React from "react";
import axios from "axios";
import { BACKEND_URL } from "./config";

export default function Homepage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const startDownload = async () => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      alert("Please enter a YouTube URL.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/download`, { url: trimmedUrl });
      window.open(res.data.url, "_blank");
      setUrl('')
    } catch (error) {
      alert("Download failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-300/90 via-white to-rose-300/90 w-screen h-screen overflow-hidden flex flex-col items-center justify-center px-5 py-16 md:px-50 md:py-24">
      <div className="max-w-3xl text-center space-y-4 mb-10">
        <button className="text-red-600 bg-red-100 rounded-lg p-2 md:px-3 md:py-2 cursor-pointer hover:shadow hover:bg-red-200 transition font-semibold text-xs">
          Welcome to YouTube Downloader
        </button>
        <h1 className="text-4xl sm:text-6xl font-bold">
          Download <span className="text-red-600">YouTube Videos</span> Instantly
        </h1>
        <p className="text-gray-600 text-sm md:text-xl">
          Paste any YouTube URL below to quickly download the video directly to your system.
        </p>
      </div>

      <div className="flex w-full max-w-xl items-center p-2 md:px-4 md:py-2 rounded-xl shadow-sm mb-5 md:mb-16 border border-gray-100">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your YouTube video URL here..."
          className="flex-1 text-sm md:text-lg mr-2 bg-transparent border-none text-black placeholder-gray-500 focus:outline-none"
        />
        <button
          onClick={startDownload}
          className="bg-red-600 text-white px-3 text-xs md:text-xl md:px-4 py-2 rounded-lg hover:bg-red-700 transition"
          disabled={loading}
        >
          {loading ? "Downloading.." : "Download"}
        </button>
      </div>
    </div>
  );
}
