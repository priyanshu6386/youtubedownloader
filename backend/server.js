const express = require('express');
const getDownloadFormats = require('./utils/ytdl');
const cors = require('cors');
const app = express();
app.use(cors());


app.get('/',(req,res)=>{
  res.send('Welcome to YouTube Downloader API');
})

app.get('/api/download/:videoId', async (req, res) => {
  const videoUrl = `https://www.youtube.com/watch?v=${req.params.videoId}`;
  try {
    const formats = await getDownloadFormats(videoUrl);
    res.json({ formats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch download links' });
  }
});

app.get('/api/stream/:videoId/:itag', async (req, res) => {
  const videoUrl = `https://www.youtube.com/watch?v=${req.params.videoId}`;
  try {
    const formats = await getDownloadFormats(videoUrl);
    const format = formats.find(f => f.itag === req.params.itag);
    if (!format) {
      return res.status(404).json({ error: 'Format not found' });
    }
    res.redirect(format.url); // stream redirect
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Stream failed' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`➡️ Backend running on port ${PORT}`));
