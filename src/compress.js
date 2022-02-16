module.exports = function compress(data) {
  let compressed = '';
  for (let index = 0, max = data.length; index < max; index++) {
    const chunk = data[index];
    compressed += `${chunk}\n`;
  }
  return compressed;
};
