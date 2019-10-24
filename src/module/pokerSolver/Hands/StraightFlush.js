import Hand from './Hand.js';
import Straight from './Straight.js';

export default class StraightFlush extends Hand {
  constructor(cards, game, canDisqualify) {
    super(cards, 'Straight Flush', game, canDisqualify);
  }

  solve() {
    let cards;
    this.resetWildCards();
    let possibleStraight = null;
    let nonCards = [];
    let suit;
    for (suit in this.suits) {
      cards = this.getCardsForFlush(suit, false);
      if (cards && cards.length >= this.game.sfQualify) {
        possibleStraight = cards;
        break;
      }
    }

    if (possibleStraight) {
      if (this.game.descr !== 'standard') {
        for (const suit in this.suits) {
          if (possibleStraight[0].suit !== suit) {
            nonCards = nonCards.concat(this.suits[suit] || []);
            nonCards = Hand.stripWilds(nonCards, this.game)[1];
          }
        }
      }
      const straight = new Straight(possibleStraight, this.game);
      if (straight.isPossible) {
        this.cards = straight.cards;
        this.cards = this.cards.concat(nonCards);
        this.sfLength = straight.sfLength;
      }
    }

    if (this.cards[0] && this.cards[0].rank === 13) {
      this.descr = 'Royal Flush';
    } else if (this.cards.length >= this.game.sfQualify) {
      this.descr = this.name + ', ' + this.cards[0].toString().slice(0, -1) + suit + ' High';
    }

    return this.cards.length >= this.game.sfQualify;
  }
}
