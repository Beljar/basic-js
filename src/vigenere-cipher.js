const CustomError = require("../extensions/custom-error");
ASCIILowerCodes = [97, 122];
ASCIIUpperCodes = [65, 90];
function inInterval([min, max], val) {
  return ((val >= min) && (val <= max));
}

class Encoder {
  /**
  * Caesar encoder
  * @param {string} str - the input string
  * @param {number[][]} targetIntervals - array of intervals of encoding chars. Each interval should be represented as array of 2 numbers [starting ASCII code, finishing ASCII code]. Chars that do not belong to any interval will not be coded
  * @param {number} shift - how many letters to shift from every given char. eg: shift=2 a=>c, b=>d etc.
  */
  constructor(targetIntervals, shift) {
    this.targetIntervals = targetIntervals;
    this.shift = shift;
  }

  charShift(char) {
    for (let interval of this.targetIntervals) {
      if (inInterval(interval, char.charCodeAt())) {
        let intLen = interval[1] - interval[0] + 1;
        this.shift = ((this.shift % intLen) + intLen) % intLen;
        return String.fromCharCode((((char.charCodeAt() + this.shift) - interval[0]) % (interval[1] - interval[0] + 1)) + interval[0]);
      }

    }
    return char;
  }

  /**
   * Encode string
   * @param {string} str - the input string
   */
  encode(str) {
    return str.split("").map(chr => this.charShift(chr))
      .join("");
  }
}

class VigenereCipheringMachine {
  constructor(type = true){
    this.type = type;
  }
  encrypt(str, key) {
    if(str == undefined || key == undefined){
      throw 'Error';
    }
    key = "".padStart(str.length, key);
    let encoder = new Encoder([ASCIILowerCodes, ASCIIUpperCodes], 0);
    let encoded = [];
    let k = 0;
    for (let i in str){
      let chr = str[i];
      if(inInterval(ASCIILowerCodes, chr.charCodeAt()) || inInterval(ASCIIUpperCodes, chr.charCodeAt())){
        let keyChr = key[k % key.length];
        k++;
        encoder.shift = keyChr.toLowerCase().charCodeAt() - 97;
        encoded.push(encoder.encode(str[i]));
      }
      else{
        encoded.push(chr);
      }
    }
    if(this.type){
      return encoded.join("").toUpperCase();
    }
    else{
      return encoded.reverse().join("").toUpperCase();
    }
    
  }    
  decrypt(str, key) {
    if(str == undefined || key == undefined){
      throw 'Error';
    }
    key = "".padStart(str.length, key);
    let encoder = new Encoder([ASCIILowerCodes, ASCIIUpperCodes], 0);
    let encoded = [];
    let k = 0;
    for (let i in str){
      let chr = str[i];
      if(inInterval(ASCIILowerCodes, chr.charCodeAt()) || inInterval(ASCIIUpperCodes, chr.charCodeAt())){
        let keyChr = key[k % key.length];
        k++;
        encoder.shift = -(keyChr.toLowerCase().charCodeAt() - 97);
        encoded.push(encoder.encode(str[i]));
      }
      else{
        encoded.push(chr);
      }
    }
    if(this.type){
      return encoded.join("").toUpperCase();
    }
    else{
      return encoded.reverse().join("").toUpperCase();
    }
  }    
  }


module.exports = VigenereCipheringMachine;
/* const directMachine = new VigenereCipheringMachine();
console.log(directMachine.encrypt('attack at dawn!', 'alphonse'));
console.log(directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse'));
console.log(directMachine.encrypt('alphonse')) */
