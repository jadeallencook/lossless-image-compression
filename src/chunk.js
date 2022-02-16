/*
    converts image data stream to chunked array
    12, 12, 12, 255, 24, 24, 24, 255
    [12, 12, 12, 255], [24, 24, 24, 255]
*/

module.exports = function chunk(data) {
  let index = 0;
  let rgba = [];
  let chucks = [];
  for (let pixel of data) {
    if (index === 4) {
      chucks.push(rgba);
      rgba = [];
      index = 0;
    }
    rgba.push(pixel);
    index++;
  }
  return chucks;
};
