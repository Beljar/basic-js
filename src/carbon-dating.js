const CustomError = require("../extensions/custom-error");

const MODERN_ACTIVITY= 15; 
const HALF_LIFE_PERIOD= 5730;

module.exports = function dateSample(sampleActivity) {
  if (typeof(sampleActivity) != "string"){
    return false;
  }
  sampleActivity = parseFloat(sampleActivity);
  if (sampleActivity > MODERN_ACTIVITY || sampleActivity <= 0 || isNaN(sampleActivity)){
    return false;
  }
/* return Math.log2(MODERN_ACTIVITY / sampleActivity) * 5730; */
return Math.ceil(Math.log(MODERN_ACTIVITY / sampleActivity) * HALF_LIFE_PERIOD / 0.693);
};

/* console.log(dateSample(3)); */