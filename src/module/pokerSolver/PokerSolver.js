import StraightFlush from './Hands/StraightFlush.js';
import FourOfAKind from './Hands/FourOfAKind.js';
import FullHouse from './Hands/FullHouse.js';
import Flush from './Hands/Flush.js';
import Straight from './Hands/Straight.js';
import ThreeOfAKind from './Hands/ThreeOfAKind.js';
import TwoPair from './Hands/TwoPair.js';
import OnePair from './Hands/OnePair.js';
import HighCard from './Hands/HighCard.js';

const game = {
  'cardsInHand': 5,
  'handValues': [StraightFlush, FourOfAKind, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, OnePair, HighCard],
  'wildValue': null,
  'wildStatus': 1,
  'wheelStatus': 0,
  'sfQualify': 5,
  'lowestQualified': null,
  'noKickers': false,
};
window.HandSolve = (cards, canDisqualify = false) => {
  cards = cards || [''];
  const hands = game.handValues;
  let result = null;

  for (let i = 0; i < hands.length; i++) {
    result = new hands[i](cards, canDisqualify);
    if (result.isPossible) {
      break;
    }
  }
  const handRank = game.handValues.length;
  let i;
  for (i=0; i< game.handValues.length; i++) {
    if (game.handValues[i] === result.constructor) {
      break;
    }
  }
  result.rank = handRank - i;
  return result;
};

window.PokerWinners = (hands) => {
  // const highestRank = Math.max(...Object.values(hands));
  const highestRank = Math.max.apply(Math, hands.map( (h) => {
    return h.rank;
  }));
  console.log(highestRank);
  hands = hands.filter((h) => {
    return h.rank === highestRank;
  });

  hands = hands.filter((h) => {
    let lose = false;
    for (let i = 0; i < hands.length; i++) {
      lose = h.loseTo(hands[i]);
      if (lose) {
        break;
      }
    }

    return !lose;
  });

  return hands;
};
