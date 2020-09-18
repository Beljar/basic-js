const CustomError = require("../extensions/custom-error");

module.exports = function getSeason(date) {
  if(date == undefined){
    return "Unable to determine the time of year!";
  }
  if (Object.getPrototypeOf(date) == Object.getPrototypeOf(new Date()) && date.getMonth.toString() == (new Date).getMonth.toString()){
  let month = date.getMonth();
    if (month >= 2 && month <= 4){
      return "spring";
    }
    if (month >= 5 && month <= 7){
      return "summer";
    }
    if (month >= 8 && month <= 10){
      return "autumn";
    }
    return "winter";
  }
  else{
    throw 'Bad input';
  }
};
