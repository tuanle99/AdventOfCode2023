var input = require("./input").input;
var test = require("./input").test;
//Not done
var currentArr = input;
var symbols = "!@#$%^&*_+=-/,";

function check(arrIndex, posIndex, splitArr) {
  var a = null;
  var b = null;
  var split = splitArr.map((x) => {
    return x
      .split(/(\!|\@|\#|\$|\%|\^|\&|\*|\.|\+|\=|\-|\,|\/)/)
      .filter((str) => str !== "");
  });

  for (var i = arrIndex - 1; i <= arrIndex + 1; i++) {
    for (var j = posIndex - 1; j <= posIndex + 1; j++) {
      if (a === null && !isNaN(parseInt(currentArr[i][j]))) {
        split.map((x, xi) => {
          x.map((y) => {
            if (xi === i && y.includes(currentArr[i][j]) && a === null) {
              a = parseInt(y);
            }
          });
        });
        if (a !== null) break;
      }
      if (b === null && a !== null && !isNaN(parseInt(currentArr[i][j]))) {
        split.map((x, xi) => {
          x.map((y) => {
            if (xi === i && y.includes(currentArr[i][j]) && b === null) {
              b = parseInt(y);
            }
          });
        });
        if (b !== null) break;
      }
    }
    if (a !== null && b !== null) {
      break;
    }
  }
  if (a === null || b === null) {
    return null;
  } else {
    return a * b;
  }
}

function getTotal(arr) {
  var total = 0;
  arr.map((a, b, arr) => {
    var split = a
      .split(/(\!|\@|\#|\$|\%|\^|\&|\*|\.|\+|\=|\-|\,|\/)/)
      .filter((str) => str !== "");

    split.map((x, y) => {
      if (symbols.includes(x) && check(b, y, currentArr) !== null) {
        total += check(b, y, currentArr);
      }
    });
  });
  return total;
}
// 31660771 is too low
console.log(getTotal(currentArr));
