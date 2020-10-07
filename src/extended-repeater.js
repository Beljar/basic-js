const CustomError = require("../extensions/custom-error");

module.exports = function repeater(str, options) {
  if(options.addition !== undefined){
    if(options.addition !== null){
      options.addition = options.addition.toString();
    }
  str += repeater(options.addition, {
    repeatTimes : (options.additionRepeatTimes ? options.additionRepeatTimes : 1), 
    separator : (options.additionSeparator ? options.additionSeparator : "|")
    });
  }
  if(str !== null){
    str = str.toString();
  }
  else{
    str = "null";
  }
  return Array(options.repeatTimes ? options.repeatTimes : 1).fill(str).join(options.separator ? options.separator : "+");   
};
  
/* console.log(repeater(null, { repeatTimes: 3, separator: '??? ', addition: null, additionRepeatTimes: 3, additionSeparator: '!!!' }))
console.log(repeater('STRING', { repeatTimes: 3, separator: '**', addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' }) == 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS')  */