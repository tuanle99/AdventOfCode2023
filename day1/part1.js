var input = require("./input").input;

function getFirstDigit(str) {
  let index = 0;
  while (index < str.length) {
    if (!isNaN(str.charAt(index))) {
      return str.charAt(index);
    }
    index++;
  }
  return null;
}

function getLastDigit(str) {
  let index = str.length - 1;
  while (index >= 0) {
    if (!isNaN(str.charAt(index))) {
      return str.charAt(index);
    }
    index--;
  }
  return null;
}

function getTotal(arr) {
  var total = 0;
  for (var i = 0; i < arr.length; i++) {
    var a = getFirstDigit(arr[i]);
    var b = getLastDigit(arr[i]);
    var c = a + b;
    var sum = parseInt(c);
    total += sum;
  }

  return total;
}

console.log(getTotal(input));
