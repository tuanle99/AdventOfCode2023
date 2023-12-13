var input = require("./input").input;
var test = require("./input").test;

var symbols = "!@#$%^&*_+=-/,";

function check(si, ei, str) {
  if (str !== null && str !== undefined) {
    for (var i = si - 1; i <= ei; i++) {
      if (symbols.includes(str.charAt(i)) && str.charAt(i) !== "") {
        return true;
      }
    }
  } else return false;
}

function getTotal(arr) {
  var total = 0;

  arr.map((e, i, arr) => {
    var split = e
      .split(/(\!|\@|\#|\$|\%|\^|\&|\*|\.|\+|\=|\-|\,|\/)/)
      .filter((str) => str !== "");
    var charCnt = 0;

    split.map((a) => {
      if (
        !isNaN(parseInt(a)) &&
        (check(charCnt, charCnt + a.length, arr[i - 1]) ||
          check(charCnt, charCnt + a.length, arr[i]) ||
          check(charCnt, charCnt + a.length, arr[i + 1]))
      ) {
        total += parseInt(a);
      }

      charCnt += a.length;
    });
  });

  return total;
}

console.log(getTotal(test));
console.log(getTotal(input));
