var input = require("./input").input;
var test = require("./input").test;

var currentArr = input;
var total = 0;
var globalIndex = 0;

function getTotal(arr) {
  total += arr.length;
  arr.map((a, i) => {
    var line = a.split(":")[1].split("|");
    var winningNum = line[0].split(" ");
    var yourNum = line[1].split(" ");
    var cnt = getCount(yourNum, winningNum);
    globalIndex = currentArr.findIndex((e) => e.includes(a));
    var sliceArr = currentArr.slice(globalIndex + 1, globalIndex + 1 + cnt);
    getTotal(sliceArr);
  });
}

function getCount(yourNum, winningNum) {
  var cnt = 0;
  yourNum.map((x) => {
    if (!isNaN(parseInt(x)) && winningNum.includes(x)) {
      cnt++;
    }
  });
  return cnt;
}

getTotal(currentArr);
console.log("total: " + total);
