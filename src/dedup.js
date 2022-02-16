/*
    dedups values in the stream
    [zŽδã, zŽδã, zŽΘã, zŽΘã] => [zŽδã, 0, zŽΘã, 2]
*/

module.exports = function dedup(data) {
  const map = {};
  let array = [];
  for (let index = 0, max = data.length; index < max; index++) {
    const byte = data[index][0];
    if (map[byte] !== undefined) {
      array.push(map[byte]);
    } else {
      map[byte] = index;
      array.push(byte);
    }
  }
  return array;
};
