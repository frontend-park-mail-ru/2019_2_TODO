import Hand from './Hand.js';
const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
export default class OnePair extends Hand {
  constructor(cards, game, canDisqualify) {
    super(cards, 'Pair', game, canDisqualify);
  }

  solve() {
    this.resetWildCards();

    for (let i=0; i<this.values.length; i++) {
      if (this.getNumCardsByRank(i) === 2) {
        this.cards = this.cards.concat(this.values[i] || []);
        for (let j=0; j<this.wilds.length && this.cards.length<2; j++) {
          const wild = this.wilds[j];
          if (this.cards) {
            wild.rank = this.cards[0].rank;
          } else {
            wild.rank = values.length - 1;
          }
          wild.wildValue = values[wild.rank];
          this.cards.push(wild);
        }
        this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand-2));
        break;
      }
    }

    if (this.cards.length >= 2) {
      if (this.game.noKickers) {
        this.cards.length = 2;
      }

      this.descr = this.name + ', ' + this.cards[0].toString().slice(0, -1) + '\'s';
    }

    return this.cards.length >= 2;
  }
}
