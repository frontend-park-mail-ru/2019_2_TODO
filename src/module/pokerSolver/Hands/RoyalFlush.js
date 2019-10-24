import StraightFlush from './StraightFlush.js';

export default class RoyalFlush extends StraightFlush {
  constructor(cards, game, canDisqualify) {
    super(cards, game, canDisqualify);
  }

  solve() {
    this.resetWildCards();
    const result = super.solve();
    return result && this.descr === 'Royal Flush';
  }
}
