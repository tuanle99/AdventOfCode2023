var input = require("./input").input;
var test = require("./input").test;

function getTotal(arr) {
  var total = 0;
  arr.map((a, key) => {
    //per game
    var s = a.split(":")[1].split(";");

    var mRed = 0;
    var mGreen = 0;
    var mBlue = 0;

    s.map((b) => {
      //per segment in game
      var t = b.split(",");
      t.map((c) => {
        var u = c.split(" ");
        if (c.includes("red") && parseInt(u[1]) > mRed) {
          mRed = parseInt(u[1]);
        }
        if (c.includes("green") && parseInt(u[1]) > mGreen) {
          mGreen = parseInt(u[1]);
        }
        if (c.includes("blue") && parseInt(u[1]) > mBlue) {
          mBlue = parseInt(u[1]);
        }
      });
    });

    total += mRed * mGreen * mBlue;
  });
  return total;
}
console.log(getTotal(test));
console.log(getTotal(input));
