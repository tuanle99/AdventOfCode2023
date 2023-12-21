var input = require("./input").input;
var test = require("./input").test;
var test2 = require("./input").test2;
var currentArr = input;
var instruction = currentArr[0].split("");
currentArr.shift();

currentArr = currentArr.map((e) => {
  var content = e.split(/[=(,) ]+/);
  content.pop();
  return content;
});
var step = 0;
var current = "AAA";
var find = currentArr.findIndex((x) => x[0] === current);

function findStep() {
  while (current !== "ZZZ") {
    for (var i = 0; i < instruction.length; i++) {
      if (current === "ZZZ") {
        return step;
      }
      var e = currentArr[find];
      current = instruction[i] === "L" ? e[1] : e[2];

      find = currentArr.findIndex((x) => x[0] === current);
      step++;
    }
  }
  return step;
}

console.log(findStep());
