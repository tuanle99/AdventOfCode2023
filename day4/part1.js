var input = require("./input").input;
var test = require("./input").test;

function getTotal(arr) {
  var total = 0;
  arr.map((a) => {
    var line = a.split(":")[1].split("|");
    var winningNum = line[0].split(" ");
    var yourNum = line[1].split(" ");
    var cnt = 0;
    yourNum.map((x) => {
      if (!isNaN(parseInt(x)) && winningNum.includes(x)) {
        cnt++;
      }
    });
    if (cnt > 0) total += Math.pow(2, cnt - 1);
  });
  return total;
}

console.log(getTotal(test));
console.log(getTotal(input));
