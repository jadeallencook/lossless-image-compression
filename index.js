/*
    Image Compression
    Developed by @jadeallencook
*/

const getPixels = require("get-pixels");
const fs = require("fs");
const image = "./bridge.jpg";

// used to add new lines to sm file
const isDev = true;

// import image and get pixel data
getPixels(image, function (err, { shape, data }) {
  if (err) {
    console.log("Bad image path");
    return;
  }
  let index = 0;
  let chunk = [];
  let chucks = [];
  let compressed = "";

  /* 
    convert pixels to chucks
    [r, g, b, a]
  */
  for (let pixel of data) {
    if (index === 4) {
      chucks.push(chunk);
      chunk = [];
      index = 0;
    }
    chunk.push(pixel);
    index++;
  }

  /*
    remove duplicate pixels
    12,12,12,255 - 12,12,12,255 - 12,12,12,100
    12,12,12,255 - # - ,,,100
  */
  let previous = [];
  compressed += `(${shape[0]})`;
  compressed += isDev ? "\n" : "";
  for (let bit of chucks) {
    const [r1, g1, b1, a1] = previous;
    const [r2, g2, b2, a2] = bit;
    const r = !previous.length ? r2 : r1 === r2 ? "" : r2;
    const g = !previous.length ? g2 : g1 === g2 ? "" : g2;
    const b = !previous.length ? b2 : b1 === b2 ? "" : b2;
    const a = !previous.length ? a2 : a1 === a2 ? "" : a2;
    const rgba = `${r},${g},${b},${a}`;
    const block = rgba.length === 3 ? '#' : rgba;
    compressed += `${block}|`;
    compressed += isDev ? "\n" : "";
    previous = [...bit];
  }

  // save chunks to sm file
  const before = fs.statSync("./chunks.sm");
  console.log(`Previous: ${before.size.toLocaleString()} bytes`);

  fs.writeFile("./chunks.sm", compressed, function (err) {
    if (err) {
      return console.log(err);
    }
    const compressed = fs.statSync("./chunks.sm");
    const orginal = fs.statSync(image);
    console.log(`Compressed: ${compressed.size.toLocaleString()} bytes`);
    console.log(`Orginal: ${orginal.size.toLocaleString()} bytes`);
  });
});
