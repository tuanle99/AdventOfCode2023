var test = require("./input").test;
var test2 = require("./input").test2;
var input = require("./input").input;
var currentArr = input;
var cardType = [
  "J",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "Q",
  "K",
  "A",
];

function countPair(array, filterNum) {
  return array.filter((x) => x.cnt === filterNum).length;
}

function findHand(arr, joker) {
  var highHand = Math.max(...arr.map((e) => e.cnt));

  switch (highHand) {
    case 1: // High Card
      if (joker === 0) return 1;
      else return 2;
    case 2: // Double or 2 pairs
      if (countPair(arr, 2) === 1) {
        if (joker === 0) return 2;
        else return 4;
      } else {
        if (joker === 0) return 3;
        else if (joker === 1) return 5;
        else return 6;
      }
    case 3: // 3 of a kind or Full House
      if (countPair(arr, 2) === 0) {
        if (joker === 0) return 4;
        else return 6;
      } else {
        if (joker === 0) return 5;
        else return 7;
      }
    case 4: // 4 of a kind
      if (joker === 0) return 6;
      else return 7;
    case 5: // 5 of a kind
      return 7;
  }
}

function checkHand(hand) {
  var containJ = hand.split("J").length - 1;
  var instance = [];
  var splitHand = hand.split("");
  splitHand.map((i) => {
    if (!instance.includes(i)) instance.push(i);
  });
  var l = instance.length;
  for (var i = 0; i < l; i++) {
    var char = instance[0];
    var cnt = 0;

    splitHand.map((e) => {
      if (e === char) cnt++;
    });

    instance.push({ char, cnt });
    instance.shift();
  }
  var handRank = findHand(instance, containJ);
  return handRank;
}

// currentArr.map((e) => {
//   var i = e.split(" ");
//   var hand = i[0];
//   var bet = i[1];
//   var rank = checkHand(hand);
//   console.log(hand, bet, rank);
// });

var rankArr = [];
currentArr.map((e) => {
  var e = e.split(" ");
  var hand = e[0];
  var bet = e[1];

  var handLevel = checkHand(hand);
  rankArr.push({ hand, bet, handLevel });
});

var rankArr = rankArr.sort((a, b) =>
  a.handLevel > b.handLevel ? 1 : b.handLevel > a.handLevel ? -1 : 0
);

function compare(curr, next) {
  for (var i = 0; i < curr.length; i++) {
    if (cardType.indexOf(curr.charAt(i)) !== cardType.indexOf(next.charAt(i))) {
      return (
        cardType.indexOf(curr.charAt(i)) > cardType.indexOf(next.charAt(i))
      );
    }
  }
}

for (var j = 0; j < rankArr.length; j++) {
  rankArr.map((x, i) => {
    if (
      rankArr[i + 1] &&
      x.handLevel === rankArr[i + 1].handLevel &&
      compare(x.hand, rankArr[i + 1].hand)
    ) {
      var temp = rankArr[i];
      rankArr[i] = rankArr[i + 1];
      rankArr[i + 1] = temp;
    }
  });
}
var total = 0;
rankArr.map((e, i) => {
  total += (i + 1) * parseInt(e.bet);
});
console.log(rankArr, total);
