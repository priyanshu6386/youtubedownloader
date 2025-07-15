import React from 'react';

const VideoPlayer = ({ videoId }) => (
  <div className="rounded-xl overflow-hidden shadow-lg mb-4">
    <div className="relative w-full pb-[56.25%]"> {/* 16:9 aspect ratio */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-xl"
      />
    </div>
  </div>
);

export default VideoPlayer;
