import React, { useEffect, useState } from 'react';
import fetchDownloadLinks from '../utils/fetchDownloadLinks';

const ALLOWED = ['144p', '240p', '360p', '480p', '720p', '1080p'];

const DownloadOptions = ({ videoId }) => {
  const [formats, setFormats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchDownloadLinks(videoId).then((f) => {
      if (!mounted) return;
      setFormats(
        f
          .filter((x) => ALLOWED.includes(x.quality)) // only standard resolutions
          .sort((a, b) => ALLOWED.indexOf(a.quality) - ALLOWED.indexOf(b.quality))
      );
      setLoading(false);
    });
    return () => (mounted = false);
  }, [videoId]);

  return (
    <div className="mt-6 rounded-2xl p-4 bg-black/60 border border-[#00eaff] shadow-[0_0_15px_#00eaff]">
      <h2 className="text-lg font-semibold mb-3 text-center text-[#00eaff]">
        💾 Download Options
      </h2>

      {loading ? (
        <>
          <p className="text-sm text-gray-300 text-center">Fetching formats...</p>
          <div className="flex justify-center mt-3">
            <div className="w-6 h-6 border-4 border-t-transparent border-[#00eaff] rounded-full animate-spin" />
          </div>
        </>
      ) : formats.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {formats.map((f, i) => (
            <a
              key={i}
              href={f.url}
              download
              target="_blank"
              rel="noreferrer"
              className="block text-center px-2 py-1 bg-[#00eaff]/20 border border-[#00eaff] rounded-lg hover:bg-[#00eaff]/40 transition"
            >
              {f.quality}
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-red-400">
          😞 No downloadable formats found.
        </p>
      )}
    </div>
  );
};

export default DownloadOptions;
