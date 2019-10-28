import Hand from './Hand.js';

export default class FourWilds extends Hand {
  constructor(cards, game, canDisqualify) {
    super(cards, 'Four Wild Cards', game, canDisqualify);
  }

  solve() {
    if (this.wilds.length === 4) {
      this.cards = this.wilds;
      this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand-4));
    }

    if (this.cards.length >= 4) {
      if (this.game.noKickers) {
        this.cards.length = 4;
      }

      this.descr = this.name;
    }

    return this.cards.length >= 4;
  }
}
