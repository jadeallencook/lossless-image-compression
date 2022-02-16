/*
    removed duplicate chars
    ABBB => AB-
    AAAB => A-B
    AAAA => A
*/

module.exports = function shorten(chucks) {
  let data = [];
  for (let chunk of chucks) {
    chuck = `${chunk}`;
    if (chunk.length === 4) {
      const first = chuck.substring(0, 3);
      const last = chunk.substr(chunk.length - 3);
      if (/^(.)\1+$/.test(chunk)) {
        data.push(chunk[0]);
      } else if (/^(.)\1+$/.test(first)) {
        data.push(`${first[0]}-${last[2]}`);
      } else if (/^(.)\1+$/.test(last)) {
        data.push(`${first}${last[0]}-`);
      } else {
        data.push(chunk);
      }
    } else {
      data.push(chunk);
    }
  }
  return data;
};
