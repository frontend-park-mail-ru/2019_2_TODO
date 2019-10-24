import Hand from './Hands/Hand.js';
import StraightFlush from './Hands/StraightFlush.js';
import Game from './Game/Game.js';
import RoyalFlush from './Hands/RoyalFlush.js';
import NaturalRoyalFlush from './Hands/NaturalRoyalFlush.js';
import WildRoyalFlush from './Hands/WildRoyalFlush.js';
import FiveOfAKind from './Hands/FiveOfAKin.js';
import FourOfAKindPairPlus from './Hands/FourOfAKindPairPlus.js';
import FourOfAKind from './Hands/FourOfAKind.js';
import FourWilds from './Hands/FourWild.js';
import TwoThreeOfAKind from './Hands/TwoThreeOfAKind.js';
import ThreeOfAKindTwoPair from './Hands/ThreeOfAKindTwoPair.js';
import FullHouse from './Hands/FullHouse.js';
import Flush from './Hands/Flush.js';
import Straight from './Hands/Straight.js';
import ThreeOfAKind from './Hands/ThreeOfAKind.js';
import ThreePair from './Hands/ThreePair.js';
import TwoPair from './Hands/TwoPair.js';
import OnePair from './Hands/OnePair.js';
import HighCard from './Hands/HighCard.js';
import PaiGowPokerHelper from './PaiGowPokerHelper/PaiGowPokerHelper.js';

const exportToGlobal = (global) => {
  global.Hand = Hand;
  global.Game = Game;
  global.RoyalFlush = RoyalFlush;
  global.NaturalRoyalFlush = NaturalRoyalFlush;
  global.WildRoyalFlush = WildRoyalFlush;
  global.FiveOfAKind = FiveOfAKind;
  global.StraightFlush = StraightFlush;
  global.FourOfAKindPairPlus = FourOfAKindPairPlus;
  global.FourOfAKind = FourOfAKind;
  global.FourWilds = FourWilds;
  global.TwoThreeOfAKind = TwoThreeOfAKind;
  global.ThreeOfAKindTwoPair = ThreeOfAKindTwoPair;
  global.FullHouse = FullHouse;
  global.Flush = Flush;
  global.Straight = Straight;
  global.ThreeOfAKind = ThreeOfAKind;
  global.ThreePair = ThreePair;
  global.TwoPair = TwoPair;
  global.OnePair = OnePair;
  global.HighCard = HighCard;
  global.PaiGowPokerHelper = PaiGowPokerHelper;
};


if (typeof window !== 'undefined') {
  exportToGlobal(window);
}
