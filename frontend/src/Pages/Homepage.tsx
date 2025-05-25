import { useState } from "react";
import React from "react";
import axios from "axios";

export default function Homepage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const startDownload = async () => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      alert("Please enter a YouTube URL.");
      return;
    }
    console.log(trimmedUrl);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/download", { url: trimmedUrl });
      window.location.href = res.data.url;
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-screen h-screen overflow-hidden flex flex-col items-center justify-center px-5 py-16 md:px-50 md:py-24">
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
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          disabled={loading}
        >
          {loading ? "Downloading..." : "Download"}
        </button>
      </div>

<a
  href="https://github.com/karsh0/"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-5 right-5 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
  aria-label="GitHub Repository"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-6 h-6"
  >
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.23c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.086 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.304 3.492.997.107-.775.42-1.304.762-1.604-2.665-.306-5.466-1.334-5.466-5.931 0-1.31.468-2.381 1.235-3.221-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.553 3.295-1.23 3.295-1.23.653 1.653.24 2.873.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.804 5.622-5.475 5.921.431.372.815 1.103.815 2.222v3.293c0 .319.218.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
</a>

    </div>
  );
}
