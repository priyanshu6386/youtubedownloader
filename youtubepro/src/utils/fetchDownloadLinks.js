export default async function fetchDownloadLinks(videoId) {
  const res = await fetch(`/api/download/${videoId}`);
  const data = await res.json();
  return data.formats || [];
}
