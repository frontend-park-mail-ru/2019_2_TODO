import Hand from './Hand.js';
import Card from '../Card/PokerCard.js';
const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
export default class HighCard extends Hand {
  constructor(cards, game, canDisqualify) {
    super(cards, 'High Card', game, canDisqualify);
  }

  solve() {
    this.cards = this.cardPool.slice(0, this.game.cardsInHand);

    for (let i=0; i<this.cards.length; i++) {
      if (this.cards[i].value === this.game.wildValue) {
        this.cards[i].wildValue = 'A';
        this.cards[i].rank = values.indexOf('A');
      }
    }

    if (this.game.noKickers) {
      this.cards.length = 1;
    }

    this.cards = this.cards.sort(Card.sort);
    this.descr = this.cards[0].toString().slice(0, -1) + ' High';

    return true;
  }
}
