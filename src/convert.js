const chars = require('./chars');

/*
    converts rgba to special chars
    [12, 12, 12, 255] => zŽδã
*/

module.exports = function convert(chucks) {
  let converted = [];
  for (let index = 0, max = chucks.length; index < max; index++) {
    const bit = chucks[index];
    const [r, g, b, a] = bit;
    const string = [chars[r] + chars[g] + chars[b] + chars[a]];
    converted.push(string);
  }
  return converted;
};
