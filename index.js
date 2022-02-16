/*
    Lossless Image Compression
    Developed by @jadeallencook
*/

const getPixels = require('get-pixels');
const fs = require('fs');
const chunk = require('./src/chunk');
const convert = require('./src/convert');
const dedup = require('./src/dedup');
const compress = require('./src/compress');
const shorten = require('./src/shorten');
const repeaters = require('./src/repeaters');
const isDev = process.argv[2] === '--dev';
const image = './assets/large.png';

function write(compressed) {
  const before = fs.statSync('./chunks.sm');
  console.log(
    '\n\x1b[34mPrevious: ',
    `\x1b[0m${before.size.toLocaleString()} bytes`
  );
  fs.writeFile('./chunks.sm', compressed, function (err) {
    if (err) return console.log(err);
    const compressed = fs.statSync('./chunks.sm');
    const orginal = fs.statSync(image);
    console.log(
      '\x1b[32mCompressed: ',
      `\x1b[0m${compressed.size.toLocaleString()} bytes`
    );
    console.log(
      '\x1b[33mOriginal: ',
      `\x1b[0m${orginal.size.toLocaleString()} bytes\n`
    );
  });
}

getPixels(image, function (err, { shape, data }) {
  if (err) return;
  const chucks = chunk(data);
  const converted = convert(chucks);
  const deduped = dedup(converted);
  const compressed = compress(deduped);
  const shortened = shorten(compressed);
  const unrepeated = repeaters(shortened);
  let string = `(${shape[0]})`;
  string += isDev ? '\n' : '';
  string += unrepeated.join('\n');
  write(string);
});
