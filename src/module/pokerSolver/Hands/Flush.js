import Hand from './Hand.js';

export default class Flush extends Hand {
  constructor(cards, game, canDisqualify) {
    super(cards, 'Flush', game, canDisqualify);
  }

  solve() {
    this.sfLength = 0;
    this.resetWildCards();
    let suit;
    for (suit in this.suits) {
      const cards = this.getCardsForFlush(suit, true);
      if (cards.length >= this.game.sfQualify) {
        this.cards = cards;
        break;
      }
    }

    if (this.cards.length >= this.game.sfQualify) {
      this.descr = this.name + ', ' + this.cards[0].toString().slice(0, -1) + suit + ' High';
      this.sfLength = this.cards.length;
      if (this.cards.length < this.game.cardsInHand) {
        this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand-this.cards.length));
      }
    }

    return this.cards.length >= this.game.sfQualify;
  }
}
