var input = require("./input").input;
var test = require("./input").test;

const rRed = 12;
const rGreen = 13;
const rBlue = 14;

function getTotal(arr) {
  var total = 0;
  arr.map((a, key) => {
    //per game
    var game = key + 1;
    var includeGame = true;
    var s = a.split(":")[1].split(";");

    s.map((b) => {
      //per segment in game
      var t = b.split(",");
      t.map((c) => {
        var u = c.split(" ");
        if (c.includes("red") && parseInt(u[1]) > rRed) {
          includeGame = false;
        }
        if (c.includes("green") && parseInt(u[1]) > rGreen) {
          includeGame = false;
        }
        if (c.includes("blue") && parseInt(u[1]) > rBlue) {
          includeGame = false;
        }
      });
    });
    if (includeGame) {
      total += game;
    }
  });
  return total;
}
console.log(getTotal(test));
console.log(getTotal(input));
