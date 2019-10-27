import Hand from '../Hands/Hand.js';
import StraightFlush from '../Hands/StraightFlush.js';
import Card from '../Card/PokerCard.js';
import Game from '../Game/Game.js';
import FiveOfAKind from '../Hands/FiveOfAKin.js';
import FourOfAKindPairPlus from '../Hands/FourOfAKindPairPlus.js';
import Flush from '../Hands/Flush.js';
import FullHouse from '../Hands/FullHouse.js';
import ThreeOfAKind from '../Hands/ThreeOfAKind.js';
import ThreePair from '../Hands/ThreePair.js';
import TwoPair from '../Hands/TwoPair.js';
import OnePair from '../Hands/OnePair.js';
import TwoThreeOfAKind from '../Hands/TwoThreeOfAKind.js';
import ThreeOfAKindTwoPair from '../Hands/ThreeOfAKindTwoPair.js';
import Straight from '../Hands/Straight.js';
/*
   * Base class for handling Pai Gow Poker hands.
   * House Way is in accordance with the MGM Grand Casino, Las Vegas NV.
   * http://wizardofodds.com/games/pai-gow-poker/house-way/mgm/
   * EXCEPTION: With Four of a Kind and S/F, preserve the S/F, just like Three of a Kind.
   */
export default class PaiGowPokerHelper {
  /*
       * Constructor class.
       * @param {Hand} hand Solved hand against Game 'paigowpokerfull'.
       */
  constructor(hand) {
    this.baseHand = null;
    this.hiHand = null;
    this.loHand = null;
    this.game = null;
    this.loGame = new Game('paigowpokerlo');
    this.hiGame = new Game('paigowpokerhi');

    if (Array.isArray(hand)) {
      this.baseHand = Hand.solve(hand, new Game('paigowpokerfull'));
    } else {
      this.baseHand = hand;
    }

    this.game = this.baseHand.game;
  }

  /*
       * Set a full hand into high and low hands, according to House Way.
       */
  splitHouseWay() {
    let hiCards; let loCards;
    const rank = this.game.handValues.length - this.baseHand.rank;
    const handValue = this.game.handValues[rank];

    if (handValue === FiveOfAKind) {
      if (this.baseHand.cards[5].value === 'K' && this.baseHand.cards[6].value === 'K') {
        loCards = this.baseHand.cards.slice(5, 7);
        hiCards = this.baseHand.cards.slice(0, 5);
      } else {
        loCards = this.baseHand.cards.slice(0, 2);
        hiCards = this.baseHand.cards.slice(2, 7);
      }
    } else if (handValue === FourOfAKindPairPlus) {
      if (this.baseHand.cards[0].wildValue === 'A' && this.baseHand.cards[4].value !== 'K') {
        hiCards = this.baseHand.cards.slice(0, 2);
        loCards = this.baseHand.cards.slice(2, 4);
        hiCards = hiCards.concat(this.baseHand.cards.slice(4, 7));
      } else {
        hiCards = this.baseHand.cards.slice(0, 4);
        loCards = this.baseHand.cards.slice(4, 6);
        hiCards.push(this.baseHand.cards[6]);
      }
    } else if (handValue === StraightFlush || handValue === Flush || handValue === StraightFlush) {
      let sfReturn;
      const altGame = new Game('paigowpokeralt');
      const altHand = Hand.solve(this.baseHand.cards, altGame);
      const altRank = altGame.handValues.length - altHand.rank;
      if (altGame.handValues[altRank] === FiveOfAKind) {
        sfReturn = this.getSFData(altHand.cards);
        hiCards = sfReturn[0];
        loCards = sfReturn[1];
      } else if (altGame.handValues[altRank] === FullHouse) {
        hiCards = altHand.cards.slice(0, 3);
        loCards = altHand.cards.slice(3, 5);
        hiCards = hiCards.concat(altHand.cards.slice(5, 7));
      } else if (altGame.handValues[altRank] === ThreeOfAKind) {
        sfReturn = this.getSFData(altHand.cards);
        hiCards = sfReturn[0];
        loCards = sfReturn[1];
      } else if (altGame.handValues[altRank] === ThreePair) {
        loCards = altHand.cards.slice(0, 2);
        hiCards = altHand.cards.slice(2, 7);
      } else if (altGame.handValues[altRank] === TwoPair) {
        if (altHand.cards[0].rank < 6) {
          if (altHand.cards[4].wildValue === 'A') {
            hiCards = altHand.cards.slice(0, 4);
            loCards = altHand.cards.slice(4, 6);
            hiCards.push(altHand.cards[6]);
          } else {
            sfReturn = this.getSFData(altHand.cards);
            hiCards = sfReturn[0];
            loCards = sfReturn[1];
          }
        } else if (altHand.cards[0].rank < 10) {
          if (altHand.cards[4].wildValue === 'A') {
            hiCards = altHand.cards.slice(0, 4);
            loCards = altHand.cards.slice(4, 6);
            hiCards.push(altHand.cards[6]);
          } else {
            hiCards = altHand.cards.slice(0, 2);
            loCards = altHand.cards.slice(2, 4);
            hiCards = hiCards.concat(altHand.cards.slice(4, 7));
          }
        } else if (altHand.cards[0].wildValue !== 'A' && altHand.cards[2].rank < 6 && altHand.cards[4].wildValue === 'A') {
          hiCards = altHand.cards.slice(0, 4);
          loCards = altHand.cards.slice(4, 6);
          hiCards.push(altHand.cards[6]);
        } else {
          hiCards = altHand.cards.slice(0, 2);
          loCards = altHand.cards.slice(2, 4);
          hiCards = hiCards.concat(altHand.cards.slice(4, 7));
        }
      } else if (altGame.handValues[altRank] === OnePair) {
        if (altHand.cards[0].rank >= values.indexOf('T') && altHand.cards[0].rank <= values.indexOf('K') && altHand.cards[2].wildValue === 'A') {
          let possibleSF = altHand.cards.slice(0, 2);
          possibleSF = possibleSF.concat(altHand.cards.slice(3, 7));
          sfReturn = this.getSFData(possibleSF);
          if (sfReturn[0]) {
            hiCards = sfReturn[0];
            loCards = sfReturn[1];
            loCards.push(altHand.cards[2]);
          } else {
            hiCards = altHand.cards.slice(0, 2);
            loCards = altHand.cards.slice(2, 4);
            hiCards = hiCards.concat(altHand.cards.slice(4, 7));
          }
        } else {
          sfReturn = this.getSFData(altHand.cards.slice(2, 7));
          if (sfReturn[0]) {
            hiCards = sfReturn[0];
            loCards = altHand.cards.slice(0, 2);
          } else {
            sfReturn = this.getSFData(altHand.cards);
            hiCards = sfReturn[0];
            loCards = sfReturn[1];
          }
        }
      } else {
        sfReturn = this.getSFData(altHand.cards);
        hiCards = sfReturn[0];
        loCards = sfReturn[1];
      }
    } else if (handValue === FourOfAKind) {
      if (this.baseHand.cards[0].rank < 6) {
        hiCards = this.baseHand.cards.slice(0, 4);
        loCards = this.baseHand.cards.slice(4, 6);
        hiCards.push(this.baseHand.cards[6]);
      } else if (this.baseHand.cards[0].rank < 10 && this.baseHand.cards[4].wildValue === 'A') {
        hiCards = this.baseHand.cards.slice(0, 4);
        loCards = this.baseHand.cards.slice(4, 6);
        hiCards.push(this.baseHand.cards[6]);
      } else {
        hiCards = this.baseHand.cards.slice(0, 2);
        loCards = this.baseHand.cards.slice(2, 4);
        hiCards = hiCards.concat(this.baseHand.cards.slice(4, 7));
      }
    } else if (handValue === TwoThreeOfAKind) {
      loCards = this.baseHand.cards.slice(0, 2);
      hiCards = this.baseHand.cards.slice(3, 6);
      hiCards.push(this.baseHand.cards[2]);
      hiCards.push(this.baseHand.cards[6]);
    } else if (handValue === ThreeOfAKindTwoPair) {
      hiCards = this.baseHand.cards.slice(0, 3);
      loCards = this.baseHand.cards.slice(3, 5);
      hiCards = hiCards.concat(this.baseHand.cards.slice(5, 7));
    } else if (handValue === FullHouse) {
      if (this.baseHand.cards[3].wildValue === '2' && this.baseHand.cards[5].wildValue === 'A' && this.baseHand.cards[6].wildValue === 'K') {
        hiCards = this.baseHand.cards.slice(0, 5);
        loCards = this.baseHand.cards.slice(5, 7);
      } else {
        hiCards = this.baseHand.cards.slice(0, 3);
        loCards = this.baseHand.cards.slice(3, 5);
        hiCards = hiCards.concat(this.baseHand.cards.slice(5, 7));
      }
    } else if (handValue === ThreeOfAKind) {
      if (this.baseHand.cards[0].wildValue === 'A') {
        hiCards = this.baseHand.cards.slice(0, 2);
        loCards = this.baseHand.cards.slice(2, 4);
        hiCards = hiCards.concat(this.baseHand.cards.slice(4, 7));
      } else {
        hiCards = this.baseHand.cards.slice(0, 3);
        loCards = this.baseHand.cards.slice(3, 5);
        hiCards = hiCards.concat(this.baseHand.cards.slice(5, 7));
      }
    } else if (handValue === ThreePair) {
      loCards = this.baseHand.cards.slice(0, 2);
      hiCards = this.baseHand.cards.slice(2, 7);
    } else if (handValue === TwoPair) {
      if (this.baseHand.cards[0].rank < 6) {
        hiCards = this.baseHand.cards.slice(0, 4);
        loCards = this.baseHand.cards.slice(4, 6);
        hiCards.push(this.baseHand.cards[6]);
      } else if (this.baseHand.cards[0].rank < 10) {
        if (this.baseHand.cards[4].wildValue === 'A') {
          hiCards = this.baseHand.cards.slice(0, 4);
          loCards = this.baseHand.cards.slice(4, 6);
          hiCards.push(this.baseHand.cards[6]);
        } else {
          hiCards = this.baseHand.cards.slice(0, 2);
          loCards = this.baseHand.cards.slice(2, 4);
          hiCards = hiCards.concat(this.baseHand.cards.slice(4, 7));
        }
      } else if (this.baseHand.cards[0].wildValue !== 'A' && this.baseHand.cards[2].rank < 6 && this.baseHand.cards[4].wildValue === 'A') {
        hiCards = this.baseHand.cards.slice(0, 4);
        loCards = this.baseHand.cards.slice(4, 6);
        hiCards.push(this.baseHand.cards[6]);
      } else {
        hiCards = this.baseHand.cards.slice(0, 2);
        loCards = this.baseHand.cards.slice(2, 4);
        hiCards = hiCards.concat(this.baseHand.cards.slice(4, 7));
      }
    } else if (handValue === OnePair) {
      hiCards = this.baseHand.cards.slice(0, 2);
      loCards = this.baseHand.cards.slice(2, 4);
      hiCards = hiCards.concat(this.baseHand.cards.slice(4, 7));
    } else {
      hiCards = [this.baseHand.cards[0]];
      loCards = this.baseHand.cards.slice(1, 3);
      hiCards = hiCards.concat(this.baseHand.cards.slice(3, 7));
    }

    this.hiHand = Hand.solve(hiCards, this.hiGame);
    this.loHand = Hand.solve(loCards, this.loGame);
  }

  /*
       * Determine the best possible Straight and/or Flush.
       * @param  {Array} cards 5-7 Card objects to check.
       * @return {Array} [hiCards, loCards] High and Low components, if any.
       */
  getSFData(cards) {
    let hiCards; let possibleLoCards; let bestLoCards; let bestHand;
    const handsToCheck = [
      new StraightFlush(cards, new Game('paigowpokersf7')),
      new StraightFlush(cards, new Game('paigowpokersf6')),
      new StraightFlush(cards, this.game),
      new Flush(cards, new Game('paigowpokersf7')),
      new Flush(cards, new Game('paigowpokersf6')),
      new Flush(cards, this.game),
      new Straight(cards, new Game('paigowpokersf7')),
      new Straight(cards, new Game('paigowpokersf6')),
      new Straight(cards, this.game),
    ];

    for (let i=0; i<handsToCheck.length; i++) {
      const hand = handsToCheck[i];
      if (hand.isPossible) {
        if (hand.sfLength === 7) {
          possibleLoCards = [hand.cards[0], hand.cards[1]];
        } else if (hand.sfLength === 6) {
          possibleLoCards = [hand.cards[0]];
          if (cards.length > 6) {
            possibleLoCards.push(hand.cards[6]);
          }
        } else if (cards.length > 5) {
          possibleLoCards = [hand.cards[5]];
          if (cards.length > 6) {
            possibleLoCards.push(hand.cards[6]);
          }
        }
        if (possibleLoCards) {
          possibleLoCards = possibleLoCards.sort(Card.sort);
          if (!bestLoCards || bestLoCards[0].rank < possibleLoCards[0].rank || (bestLoCards.length > 1 && bestLoCards[0].rank === possibleLoCards[0].rank && bestLoCards[1].rank < possibleLoCards[1].rank)) {
            bestLoCards = possibleLoCards;
            bestHand = hand;
          }
        } else if (!bestHand) {
          bestHand = hand;
          break;
        }
      }
    }

    if (bestHand) {
      if (bestHand.sfLength === 7) {
        hiCards = bestHand.cards.slice(2, 7);
      } else if (bestHand.sfLength === 6) {
        hiCards = bestHand.cards.slice(1, 6);
      } else {
        hiCards = bestHand.cards.slice(0, 5);
      }
    }

    return [hiCards, bestLoCards];
  }

  /*
       * Determine if the setting of the hands is valid. Hi must be higher than lo.
       * @return {Boolean}
       */
  qualifiesValid() {
    const compareHands = Hand.winners([this.hiHand, this.loHand]);

    return !(compareHands.length === 1 && compareHands[0] === this.loHand);
  }

  /**
     * Find which of two split hands is best, according to rules.
     * @param  {PaiGowPokerHelper} player Player hand to evaluate. Must be set.
     * @param  {PaiGowPokerHelper} banker Banker hand to evaluate. Must be set.
     * @param  {int}               winner Winning party, if any.
     *                                    Player = 1, Banker = -1, Push = 0
     */
  static winners(player, banker) {
    if (!player.qualifiesValid()) {
      if (banker.qualifiesValid()) {
        return -1;
      }
      // Probably shouldn't get here because the dealer must set house way.
      // However, we'll still have it as a sanity check, just in case.
      return 0;
    }

    if (!banker.qualifiesValid()) {
      return 1;
    }

    const hiWinner = Hand.winners([player.hiHand, banker.hiHand]);
    const loWinner = Hand.winners([player.loHand, banker.loHand]);

    // In Pai Gow Poker, Banker takes any equal valued hands.
    if (hiWinner.length === 1 && hiWinner[0] === player.hiHand) {
      if (loWinner.length === 1 && loWinner[0] === player.loHand) {
        // Player wins both; player wins
        return 1;
      }
      // Player wins hi, Banker wins lo; push
      return 0;
    }

    if (loWinner.length === 1 && loWinner[0] === player.loHand) {
      // Banker wins hi, Player wins lo; push
      return 0;
    }

    // Banker wins both; banker wins
    return -1;
  }

  /*
       * Set a full hand into high and low hands, according to manual input.
       * @param  {Array} hiHand       High hand to specify.
       *                              Can also be {Hand} with game of 'paigowpokerhi'.
       * @param  {Array} loHand       Low hand to specify.
       *                              Can also be {Hand} with game of 'paigowpokerlo'.
       * @return {PaiGowPokerHelper}  Object with split hands.
       */
  static setHands(hiHand, loHand) {
    let fullHand = [];

    if (Array.isArray(hiHand)) {
      hiHand = Hand.solve(hiHand, new Game('paigowpokerhi'));
    }
    fullHand = fullHand.concat(hiHand.cardPool);
    if (Array.isArray(loHand)) {
      loHand = Hand.solve(loHand, new Game('paigowpokerlo'));
    }
    fullHand = fullHand.concat(loHand.cardPool);

    const result = new PaiGowPokerHelper(fullHand);
    result.hiHand = hiHand;
    result.loHand = loHand;

    return result;
  }

  /**
     * Build and return PaiGowPokerHelper object with hands split House Way.
     * @param  {Array} fullHand    Array of cards (['Ad', '3c', 'Th', ...]).
     *                             Can also be {Hand} with game of 'paigowpokerfull'.
     * @return {PaiGowPokerHelper} Object with split hands.
     */
  static solve(fullHand) {
    const result = new PaiGowPokerHelper(fullHand = fullHand || ['']);
    result.splitHouseWay();

    return result;
  }
}
