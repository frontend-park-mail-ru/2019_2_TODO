import StraightFlush from '../Hands/StraightFlush.js';
import FourOfAKind from '../Hands/FourOfAKind.js';
import FullHouse from '../Hands/FullHouse.js';
import Flush from '../Hands/Flush.js';
import Straight from '../Hands/Straight.js';
import ThreeOfAKind from '../Hands/ThreeOfAKind.js';
import TwoPair from '../Hands/TwoPair.js';
import OnePair from '../Hands/OnePair.js';
import HighCard from '../Hands/HighCard.js';
import NaturalRoyalFlush from '../Hands/NaturalRoyalFlush.js';
import FiveOfAKind from '../Hands/FiveOfAKin.js';
import WildRoyalFlush from '../Hands/WildRoyalFlush.js';
import FourWilds from '../Hands/FourWild.js';
import FourOfAKindPairPlus from '../Hands/FourOfAKindPairPlus.js';
import TwoThreeOfAKind from '../Hands/TwoThreeOfAKind.js';
import ThreeOfAkindTwoPair from '../Hands/ThreeOfAKindTwoPair.js';
import ThreePair from '../Hands/ThreePair.js';

const gameRules = {
  'standard': {
    'cardsInHand': 5,
    'handValues': [StraightFlush, FourOfAKind, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, OnePair, HighCard],
    'wildValue': null,
    'wildStatus': 1,
    'wheelStatus': 0,
    'sfQualify': 5,
    'lowestQualified': null,
    'noKickers': false,
  },
  'jacksbetter': {
    'cardsInHand': 5,
    'handValues': [StraightFlush, FourOfAKind, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, OnePair, HighCard],
    'wildValue': null,
    'wildStatus': 1,
    'wheelStatus': 0,
    'sfQualify': 5,
    'lowestQualified': ['Jc', 'Jd', '4h', '3s', '2c'],
    'noKickers': true,
  },
  'joker': {
    'cardsInHand': 5,
    'handValues': [NaturalRoyalFlush, FiveOfAKind, WildRoyalFlush, StraightFlush, FourOfAKind, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, HighCard],
    'wildValue': 'O',
    'wildStatus': 1,
    'wheelStatus': 0,
    'sfQualify': 5,
    'lowestQualified': ['4c', '3d', '3h', '2s', '2c'],
    'noKickers': true,
  },
  'deuceswild': {
    'cardsInHand': 5,
    'handValues': [NaturalRoyalFlush, FourWilds, WildRoyalFlush, FiveOfAKind, StraightFlush, FourOfAKind, FullHouse, Flush, Straight, ThreeOfAKind, HighCard],
    'wildValue': '2',
    'wildStatus': 1,
    'wheelStatus': 0,
    'sfQualify': 5,
    'lowestQualified': ['5c', '4d', '3h', '3s', '3c'],
    'noKickers': true,
  },
  'threecard': {
    'cardsInHand': 3,
    'handValues': [StraightFlush, ThreeOfAKind, Straight, Flush, OnePair, HighCard],
    'wildValue': null,
    'wildStatus': 1,
    'wheelStatus': 0,
    'sfQualify': 3,
    'lowestQualified': ['Qh', '3s', '2c'],
    'noKickers': false,
  },
  'fourcard': {
    'cardsInHand': 4,
    'handValues': [FourOfAKind, StraightFlush, ThreeOfAKind, Flush, Straight, TwoPair, OnePair, HighCard],
    'wildValue': null,
    'wildStatus': 1,
    'wheelStatus': 0,
    'sfQualify': 4,
    'lowestQualified': null,
    'noKickers': true,
  },
  'fourcardbonus': {
    'cardsInHand': 4,
    'handValues': [FourOfAKind, StraightFlush, ThreeOfAKind, Flush, Straight, TwoPair, OnePair, HighCard],
    'wildValue': null,
    'wildStatus': 1,
    'wheelStatus': 0,
    'sfQualify': 4,
    'lowestQualified': ['Ac', 'Ad', '3h', '2s'],
    'noKickers': true,
  },
  'paigowpokerfull': {
    'cardsInHand': 7,
    'handValues': [FiveOfAKind, FourOfAKindPairPlus, StraightFlush, Flush, Straight, FourOfAKind, TwoThreeOfAKind, ThreeOfAkindTwoPair, FullHouse, ThreeOfAKind, ThreePair, TwoPair, OnePair, HighCard],
    'wildValue': 'O',
    'wildStatus': 0,
    'wheelStatus': 1,
    'sfQualify': 5,
    'lowestQualified': null,
  },
  'paigowpokeralt': {
    'cardsInHand': 7,
    'handValues': [FourOfAKind, FullHouse, ThreeOfAKind, ThreePair, TwoPair, OnePair, HighCard],
    'wildValue': 'O',
    'wildStatus': 0,
    'wheelStatus': 1,
    'sfQualify': 5,
    'lowestQualified': null,
  },
  'paigowpokersf6': {
    'cardsInHand': 7,
    'handValues': [StraightFlush, Flush, Straight],
    'wildValue': 'O',
    'wildStatus': 0,
    'wheelStatus': 1,
    'sfQualify': 6,
    'lowestQualified': null,
  },
  'paigowpokersf7': {
    'cardsInHand': 7,
    'handValues': [StraightFlush, Flush, Straight],
    'wildValue': 'O',
    'wildStatus': 0,
    'wheelStatus': 1,
    'sfQualify': 7,
    'lowestQualified': null,
  },
  'paigowpokerhi': {
    'cardsInHand': 5,
    'handValues': [FiveOfAKind, StraightFlush, FourOfAKind, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, OnePair, HighCard],
    'wildValue': 'O',
    'wildStatus': 0,
    'wheelStatus': 1,
    'sfQualify': 5,
    'lowestQualified': null,
  },
  'paigowpokerlo': {
    'cardsInHand': 2,
    'handValues': [OnePair, HighCard],
    'wildValue': 'O',
    'wildStatus': 0,
    'wheelStatus': 1,
    'sfQualify': 5,
    'lowestQualified': null,
  },
};

/**
 * Base Game class that defines the rules of the game.
 */
export default class Game {
  /**
     *
     * @param {string} descr
     */
  constructor(descr) {
    this.descr = descr;
    this.cardsInHand = 0;
    this.handValues = [];
    this.wildValue = null;
    this.wildStatus = 0;
    this.wheelStatus = 0;
    this.sfQualify = 5;
    this.lowestQualified = null;
    this.noKickers = null;

    // Set values based on the game rules.
    if (!this.descr || !gameRules[this.descr]) {
      this.descr = 'standard';
    }
    this.cardsInHand = gameRules[this.descr]['cardsInHand'];
    this.handValues = gameRules[this.descr]['handValues'];
    this.wildValue = gameRules[this.descr]['wildValue'];
    this.wildStatus = gameRules[this.descr]['wildStatus'];
    this.wheelStatus = gameRules[this.descr]['wheelStatus'];
    this.sfQualify = gameRules[this.descr]['sfQualify'];
    this.lowestQualified = gameRules[this.descr]['lowestQualified'];
    this.noKickers = gameRules[this.descr]['noKickers'];
  }
}
