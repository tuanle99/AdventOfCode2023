var test = require("./input").test;
var input = require("./input").input;
var currentArr = input;
var cardType = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

function countPair(array, filterNum) {
  return array.filter((x) => x.cnt === filterNum).length;
}

function findHand(arr) {
  var highHand = Math.max(...arr.map((e) => e.cnt));

  switch (highHand) {
    case 1:
      return 1; // High Card
    case 2:
      if (countPair(arr, 2) === 1) return 2; // One Pair
      else return 3; // Two Pairs
    case 3:
      if (countPair(arr, 2) === 0) return 4; // Three of a Kind
      else return 5; // Full House
    case 4:
      return 6; // Four of a Kind
    case 5:
      return 7; // Five of a Kind
  }
}

function checkHand(hand) {
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

  return findHand(instance);
}
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
