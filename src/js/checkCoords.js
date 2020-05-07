export default function checkCoords(coords) {
  let final = coords;
  if (!final.includes(' ')) {
    const latitude = final.slice(0, final.indexOf(','));
    const longitude = final.slice(final.indexOf(',') + 1);
    final = `${latitude}, ${longitude}`;
  }
  if (final.includes('[') && final.includes(']')) {
    final = final.slice(final.indexOf('[') + 1, final.indexOf(']'));
  }
  const isvalid = /^[-—–−-]?\d{1,2}\.\d{5}, [-—–−-]?\d{1,2}.\d{5}$/.test(final);
  if (isvalid) {
    return final;
  }
  return null;
}
