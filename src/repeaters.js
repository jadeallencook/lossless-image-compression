module.exports = function repeaters(chunks) {
  let repeated = 0;
  let previous = '';
  const data = [];
  for (let chunk of chunks) {
    if (chunk === previous) {
      repeated++;
    } else {
      if (repeated) {
        data.push(`${repeated}x`);
      }
      data.push(chunk);
      previous = chunk;
      repeated = 0;
    }
  }
  if (repeated) {
    data.push(`${repeated}x`);
  }
  return data;
};
