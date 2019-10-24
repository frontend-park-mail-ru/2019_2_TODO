import Hand from './Hand.js';
const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
export default class TwoThreeOfAKind extends Hand {
  constructor(cards, game, canDisqualify) {
    super(cards, 'Two Three Of a Kind', game, canDisqualify);
  }

  solve() {
    this.resetWildCards();
    for (let i=0; i<this.values.length; i++) {
      const cards = this.values[i];
      if (this.cards.length > 0 && this.getNumCardsByRank(i) === 3) {
        this.cards = this.cards.concat(cards || []);
        for (let j=0; j<this.wilds.length; j++) {
          const wild = this.wilds[j];
          if (wild.rank !== -1) {
            continue;
          }
          if (cards) {
            wild.rank = cards[0].rank;
          } else if (this.cards[0].rank === values.length - 1 && this.game.wildStatus === 1) {
            wild.rank = values.length - 2;
          } else {
            wild.rank = values.length - 1;
          }
          wild.wildValue = values[wild.rank];
          this.cards.push(wild);
        }
        this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand-6));
        break;
      } else if (this.getNumCardsByRank(i) === 3) {
        this.cards = this.cards.concat(cards);
        for (let j=0; j<this.wilds.length; j++) {
          const wild = this.wilds[j];
          if (wild.rank !== -1) {
            continue;
          }
          if (cards) {
            wild.rank = cards[0].rank;
          } else if (this.cards[0].rank === values.length - 1 && this.game.wildStatus === 1) {
            wild.rank = values.length - 2;
          } else {
            wild.rank = values.length - 1;
          }
          wild.wildValue = values[wild.rank];
          this.cards.push(wild);
        }
      }
    }

    if (this.cards.length >= 6) {
      const type = this.cards[0].toString().slice(0, -1) + '\'s & ' + this.cards[3].toString().slice(0, -1) + '\'s';
      this.descr = this.name + ', ' + type;
    }

    return this.cards.length >= 6;
  }
}
