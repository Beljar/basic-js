const CustomError = require("../extensions/custom-error");

module.exports =  function createDreamTeam(members) {
  if (!Array.isArray(members)){
    return false;
  }
  let out = [];
  for (let i of members){
    if (typeof i ==  'string'){
      i = i.trim();
      out.push(i[0].toUpperCase());      
    }
  }
    return out.sort().join("");
  
};
/* console.log(createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']))
console.log(createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null])) */