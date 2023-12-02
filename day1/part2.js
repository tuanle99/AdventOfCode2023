var input = require("./input").input;

//o t t f f s s e n

function lookup(index, str) {
  if (str.charAt(index) === "o" && str.substring(index, index + 3) === "one") {
    return 1;
  } else if (
    str.charAt(index) === "t" &&
    str.substring(index, index + 3) === "two"
  ) {
    return 2;
  } else if (
    str.charAt(index) === "t" &&
    str.substring(index, index + 5) === "three"
  ) {
    return 3;
  } else if (
    str.charAt(index) === "f" &&
    str.substring(index, index + 4) === "four"
  ) {
    return 4;
  } else if (
    str.charAt(index) === "f" &&
    str.substring(index, index + 4) === "five"
  ) {
    return 5;
  } else if (
    str.charAt(index) === "s" &&
    str.substring(index, index + 3) === "six"
  ) {
    return 6;
  } else if (
    str.charAt(index) === "s" &&
    str.substring(index, index + 5) === "seven"
  ) {
    return 7;
  } else if (
    str.charAt(index) === "e" &&
    str.substring(index, index + 5) === "eight"
  ) {
    return 8;
  } else if (
    str.charAt(index) === "n" &&
    str.substring(index, index + 4) === "nine"
  ) {
    return 9;
  } else {
    return null;
  }
}

var look_up_arr = "otfsen";

function getFirstDigit(str) {
  let index = 0;
  while (index < str.length) {
    if (!isNaN(str.charAt(index))) {
      return parseInt(str.charAt(index));
    }
    if (
      look_up_arr.includes(str.charAt(index)) &&
      lookup(index, str) !== null
    ) {
      return lookup(index, str);
    }
    index++;
  }
  return null;
}

function getLastDigit(str) {
  let index = str.length - 1;
  while (index >= 0) {
    if (!isNaN(str.charAt(index))) {
      return parseInt(str.charAt(index));
    }
    if (
      look_up_arr.includes(str.charAt(index)) &&
      lookup(index, str) !== null
    ) {
      return lookup(index, str);
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
    var sum = a * 10 + b;
    total += sum;
  }

  return total;
}

console.log(getTotal(input));
