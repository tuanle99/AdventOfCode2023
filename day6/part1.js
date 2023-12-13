var input = require("./input").input;
var test = require("./input").test;

var currentArr = input;
var total = 1;

currentArr = currentArr.map((x) => {
  return x
    .split(" ")
    .filter((n) => n)
    .map((m) => (!isNaN(parseInt(m)) ? parseInt(m) : m));
});

let time = currentArr[0];
let dist = currentArr[1];
let numRaces = currentArr[0].length;

console.log(time, dist, numRaces);

for (var i = 1; i < numRaces; i++) {
  //loop through number of races
  var race = time[i];
  var cnt = 0;
  for (var j = 0; j < race; j++) {
    var record = j * (race - j);
    if (record > dist[i]) {
      cnt++;
    }
  }
  total *= cnt;
}

console.log(total);
