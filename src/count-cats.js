const CustomError = require("../extensions/custom-error");

module.exports = function countCats(matrix) {
  const cat = "^^";
  let catCount = 0;
  for (let arr of matrix){
    catCount += arr.reduce((acc, itm) => itm == cat ? acc + 1 : acc, 0);
  }
  return catCount;
};

/* let m = [
  ['##', 'dd', '00'],
  ['^^', '..', 'ss'],
  ['AA', 'dd', 'Oo'],
]
console.log(countCats(m)); */