/*
    Image Compression
    Developed by @jadeallencook
*/

const getPixels = require('get-pixels');
const fs = require('fs');
const image = './image.jpg';
const isDev = process.argv[2] === '--dev';

function chunk(data) {
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
}

function write(compressed) {
  const before = fs.statSync('./chunks.sm');
  console.log('\n\x1b[34mPrevious: ', `\x1b[0m${before.size.toLocaleString()} bytes`);
  fs.writeFile('./chunks.sm', compressed, function (err) {
    if (err) return console.log(err);
    const compressed = fs.statSync('./chunks.sm');
    const orginal = fs.statSync(image);
    console.log('\x1b[32mCompressed: ', `\x1b[0m${compressed.size.toLocaleString()} bytes`);
    console.log('\x1b[33mOriginal: ', `\x1b[0m${orginal.size.toLocaleString()} bytes\n`);
  });
}

function compress(chucks) {
  const map = {};
  let compressed = '';
  for (let index = 0, max = chucks.length; index < max; index++) {
    const bit = chucks[index];
    const [r, g, b, a] = bit;
    const rgba = `${r},${g},${b},${a}`;
    if (map[rgba]) {
      compressed += map[rgba];
    } else {
      compressed += rgba;
      map[rgba] = index;
    }
    compressed += '|';
    compressed += isDev ? '\n' : '';
  }
  return compressed;
}

getPixels(image, function (err, { shape, data }) {
  if (err) {
    console.log('Bad image path');
    return;
  }
  const chucks = chunk(data);
  let compressed = `(${shape[0]})`;
  compressed += isDev ? '\n' : '';
  compressed += compress(chucks);
  write(compressed, shape[0]);
});
