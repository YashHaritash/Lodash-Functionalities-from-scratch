const yash = require("./yash.js");

console.log(yash.compact([0, null, 1, false, 2, "", 3]));
console.log(yash.difference([2, 1], [2, 3]));
console.log(yash.intersection([2, 1], [2, 3]));
