var test = require("./input").test;
var input = require("./input").input;
var currentArr = test;

/* MY way is better, STUPID Advent of Code */

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

function countPair(array, filterNum) {
  return array.filter((x) => x.cnt === filterNum).length;
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

function countString(str, letter) {
  let count = 0;

  // looping through the items
  for (let i = 0; i < str.length; i++) {
    // check if the character is at that position
    if (str.charAt(i) == letter) {
      count += 1;
    }
  }
  return count;
}

function countPairHand(str, char) {
  return str.split("").filter((x) => x === char).length;
}

function compareHigh(h1, h2) {
  h1 = h1.split("").sort((a, b) => cardType.indexOf(b) - cardType.indexOf(a));
  h2 = h2.split("").sort((a, b) => cardType.indexOf(b) - cardType.indexOf(a));
  //console.log(h1, h2);
  for (var i = 0; i < h1.length; i++) {
    var h1Index = cardType.indexOf(h1[i]);
    var h2Index = cardType.indexOf(h2[i]);
    if (h1Index !== h2Index) {
      //console.log(h1Index < h2Index);
      if (h1Index < h2Index) {
        return false;
      } else {
        return true;
      }
    }
  }
}

function compairPair(h1, h2, sameDigit) {
  var allPairs = [];
  var h1Low = [];
  var h2Low = [];
  var h1LowPair = [];
  var h2LowPair = [];
  h1.hand.split("").map((e) => {
    var cnt = countString(h1.hand, e);
    if (cnt === sameDigit && !allPairs.includes(e)) {
      allPairs.push(e);
    }
    if (cnt === 2 && sameDigit === 3 && !allPairs.includes(e))
      h1LowPair.push(e);
    if (cnt === 1 && !allPairs.includes(e)) h1Low.push(e);
  });
  h2.hand.split("").map((e) => {
    var cnt = countString(h2.hand, e);
    if (cnt === sameDigit && !allPairs.includes(e)) {
      allPairs.push(e);
    }
    if (cnt === 2 && sameDigit === 3 && !allPairs.includes(e))
      h2LowPair.push(e);
    if (cnt === 1 && !allPairs.includes(e)) h2Low.push(e);
  });

  allPairs = allPairs.sort((a, b) => cardType.indexOf(b) - cardType.indexOf(a));
  //console.log(h1, h2, allPairs);

  // ******* if triple are the same compare the pair

  for (var i = 0; i < allPairs.length; i++) {
    var h1cnt = countPairHand(h1.hand, allPairs[i]);
    var h2cnt = countPairHand(h2.hand, allPairs[i]);

    if (h1cnt === sameDigit && h1cnt > h2cnt) return true;
    if (h2cnt === sameDigit && h2cnt > h1cnt) return false;
  }

  if (h1LowPair.length > 0) {
    return compairPair(h1, h2, 2);
  }

  if (h1Low.length > 0) {
    h1Low = h1Low.sort((a, b) => cardType.indexOf(b) - cardType.indexOf(a));
    h2Low = h2Low.sort((a, b) => cardType.indexOf(b) - cardType.indexOf(a));

    return compareHigh(h1Low.join(), h2Low.join());
  }
}

function fourOfAKind(h1, h2) {
  var h1High = highestOcc(h1.hand.split(""));
  var h2High = highestOcc(h2.hand.split(""));
  var h1Low = h1.hand.split("").filter((e) => e != h1High)[0];
  var h2Low = h2.hand.split("").filter((e) => e != h1High)[0];
  //console.log(cardType.indexOf(h1High) !== cardType.indexOf(h2High));

  if (cardType.indexOf(h1High) !== cardType.indexOf(h2High)) {
    return cardType.indexOf(h1High) > cardType.indexOf(h2High);
  } else {
    return cardType.indexOf(h1Low) > cardType.indexOf(h2Low);
  }
  //   h1 = h1.hand.split("");
  //   h2 = h2.hand.split("");
  //   for (var i = 0; i < h1.length; i++) {
  //     var h1Find = cardType.indexOf(h1[i]);
  //     var h2Find = cardType.indexOf(h2[i]);

  //     if (h1Find !== h2Find) return h1Find > h2Find;
  //   }
}

function highestOcc(array) {
  if (array.length == 0) return null;
  var modeMap = {};
  var maxEl = array[0],
    maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}

function compare(h1, h2, hl) {
  switch (hl) {
    case 1:
      return compareHigh(h1.hand, h2.hand);
    case 2:
    case 3:
      return compairPair(h1, h2, 2); //single and double pairs
    case 4:
    case 5:
      return compairPair(h1, h2, 3); //three of a kind and full house
    case 6:
      return fourOfAKind(h1, h2); //four of a kind
    case 7:
      if (
        cardType.indexOf(h1.hand.charAt(0)) >
        cardType.indexOf(h2.hand.charAt(0))
      ) {
        return true;
      } //five of a kind
      else return false;
  }
  return true;
}

var total = 0;

for (var j = 0; j < rankArr.length; j++) {
  rankArr.map((x, i) => {
    if (
      rankArr[i + 1] &&
      x.handLevel === rankArr[i + 1].handLevel &&
      compare(x, rankArr[i + 1], x.handLevel)
    ) {
      //console.log(x.handLevel === rankArr[i + 1].handLevel);
      var temp = rankArr[i];
      rankArr[i] = rankArr[i + 1];
      rankArr[i + 1] = temp;
    }
  });
}
rankArr.map((e, i) => {
  total += (i + 1) * parseInt(e.bet);
});

// rankArr.map((x) => {
//   if (x.handLevel === 6) {
//     console.log(x);
//   }
// });
//console.log(rankArr);
console.log(total);
