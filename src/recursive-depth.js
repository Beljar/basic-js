const CustomError = require("../extensions/custom-error");

module.exports = class DepthCalculator {
  calculateDepth(arr) {
    let depth = 1;
    for (let i of arr){
      if (Array.isArray(i)){
        let iDepth = this.calculateDepth(i);
        if ((iDepth + 1) > depth){
          depth = iDepth + 1;
        }
      }
    }
    return depth;
  }
};