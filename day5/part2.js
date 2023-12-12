var input = require("./input").input;
var test = require("./input").test;

var currentArr = input;
var orgArr = [];
var tempArr = [];

currentArr.map((x) => {
  if (x.length === 0) {
    orgArr.push(tempArr);
    tempArr = [];
  } else {
    tempArr.push(x);
  }
});

orgArr.push(tempArr);

var seed = orgArr.shift();
seed = seed[0].split(" ");
seed.shift();
seed = seed.map((x) => parseInt(x));

var seedPair = [];
seed.map((x, i) => {
  if (i % 2 === 1) {
    seedPair.push([seed[i - 1], seed[i]]);
  }
});

var lcd = 99999999999999999999;

//organize array
orgArr.map((x) => {
  for (var i = 1; i < x.length; i++) {
    x[i] = x[i].split(" ");
    x[i] = x[i].map((a) => parseInt(a));
  }
});

seedPair.map((a) => {
  console.log(a);
  for (var k = a[0]; k < a[0] + a[1]; k++) {
    var search = k;
    orgArr.map((x, y) => {
      for (var i = 1; i < x.length; i++) {
        var dest = x[i][0];
        var start = x[i][1];
        var range = x[i][2];

        if (search >= start && search <= start + range - 1) {
          search = dest + (search - start);
          break;
        }
      }

      if (y === orgArr.length - 1 && search < lcd) {
        lcd = search;
      }
    });
  }
});

console.log(lcd);
