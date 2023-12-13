var input = require("./input").input;
var test = require("./input").test;

var currentArr = input;

currentArr = currentArr.map((x) => {
  return x.split(" ").filter((n) => n);
});

var time = parseInt(
  currentArr[0][1] + currentArr[0][2] + currentArr[0][3] + currentArr[0][4]
);
var dist = parseInt(
  currentArr[1][1] + currentArr[1][2] + currentArr[1][3] + currentArr[1][4]
);
var cnt = 0;
for (var i = 0; i < time; i++) {
  var record = i * (time - i);
  if (record > dist) {
    cnt++;
  }
}

console.log(time, dist, cnt);
