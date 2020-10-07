const CustomError = require("../extensions/custom-error");

const chainMaker = {
  links:[],
  getLength() {
    return this.links.length;
  },
  addLink(value) {
    this.links.push(value);
    return this;
  },
  removeLink(position) {
    if ((typeof position == "number") && (position < this.links.length) && (position > 0)){
    this.links.splice(position - 1, 1);
    return this;
    }
    else{
      this.links = [];
      throw "wrong position";
    }
  },
  reverseChain() {
    this.links.reverse();
    return this;
  },
  finishChain() {
    let out = this.links.map((itm) => `( ${itm} )`).join("~~");
    this.links = [];
    return out;
  }
};

module.exports = chainMaker;


