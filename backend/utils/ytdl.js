const ytdlp = require('youtube-dl-exec');

async function getDownloadFormats(videoUrl) {
  const meta = await ytdlp(videoUrl, {
    dumpSingleJson: true,
    preferFreeFormats: true,
    noCheckCertificates: true,
    noWarnings: true,
  });

  return (meta.formats || [])
    .filter(f => f.url)
    .map(f => ({
      quality: f.format_note || f.format_id,
      url: f.url,
      itag: f.format_id
    }));
}

module.exports = getDownloadFormats;
