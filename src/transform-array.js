const CustomError = require("../extensions/custom-error");

module.exports =  function transform(arr) {
  const NEXT = "next";
  const PREV = "prev";
  const commands = new Set(["--discard-prev", "--double-prev", "--double-next", "--discard-next"]);
  class Cash {
    constructor() {
      this.value = null;
      this.repeats = 0;
    }
    write(arr) {
      if (this.value != null){
      let i = 0;
      while (i < this.repeats) {
        arr.push(this.value);
        i++;
      }
    this.reset();}
    }
    reset() {
      this.value = null;
      this.repeats = 0;
    }
    discard() {
      this.repeats--;
    }
    double() {
      if (this.value == null){
        this.repeats++
      }
      else if (this.repeats > 0){
      this.repeats++;
      }
    }
  }
  let commandFromStr = (str) => {
    if (commands.has(str)) {
      let parseResult = /--([\w]+)-([\w]+)/.exec(str);
      let action = parseResult[1];
      let subject = parseResult[2];
      return {
        "subject": subject,
        "action": action
      }
    }
    else {
      return undefined;
    }
  }
  let cash = new Cash();
  let out = [];
  for (itm of arr) {
    let command = commandFromStr(itm)
    if (command) {
      if (command.subject == NEXT) {
        cash.write(out);
      }
      cash[command.action].apply(cash);
      if (command.subject == PREV) {
        cash.write(out);
        cash.reset();
      }
    }
    else {
      cash.write(out);
      cash.value = itm;
      cash.repeats += 1;
    }
  }
  cash.write(out);
  return out;
};


/* console.log(transform([1, 2, 3, '--discard-next', 1337, '--double-prev', 4, 5]));
console.log(transform([1, 2, 3, '--double-next', 1337, '--double-prev', 4, 5]));
console.log(transform([1, 2, 3, '--discard-next', 1337, '--discard-prev', 4, 5]));
console.log(transform([1, 2, 3, '--double-next', 1337, '--discard-prev', 4, 5])); */