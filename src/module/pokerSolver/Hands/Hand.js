import Card from '../Card/PokerCard.js';


const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const game = {
  'cardsInHand': 5,
  'wildValue': null,
  'wildStatus': 1,
  'wheelStatus': 0,
  'sfQualify': 5,
  'lowestQualified': null,
  'noKickers': false,
};


/**
 * Base Hand class that handles comparisons of full hands.
 */
export default class Hand {
  constructor(cards, name, canDisqualify = false) {
    this.cardPool = [];
    this.cards = [];
    this.suits = {};
    this.values = [];
    this.wilds = [];
    this.name = name;
    this.game = game;
    this.sfLength = 0;
    this.alwaysQualifies = true;

    // Qualification rules apply for dealer's hand.
    // Also applies for single player games, like video poker.
    if (canDisqualify && this.game.lowestQualified) {
      this.alwaysQualifies = false;
    }
    this.rank = 0;

    // Set up the pool of cards.
    this.cardPool = cards.map( (c) => {
      return (typeof c === 'string') ? new Card(c) : c;
    });

    // Fix the card ranks for wild cards, and sort.
    for (let i=0; i<this.cardPool.length; i++) {
      card = this.cardPool[i];
      if (card.value === this.game.wildValue) {
        card.rank = -1;
      }
    }
    this.cardPool = this.cardPool.sort(Card.sort);

    // Create the arrays of suits and values.
    let obj; let obj1; let key; let key1; let card;
    for (let i=0; i<this.cardPool.length; i++) {
      // Make sure this value already exists in the object.
      card = this.cardPool[i];

      // We do something special if this is a wild card.
      if (card.rank === -1) {
        this.wilds.push(card);
      } else {
        (obj = this.suits)[key = card.suit] || (obj[key] = []);
        (obj1 = this.values)[key1 = card.rank] || (obj1[key1] = []);

        // Add the value to the array for that type in the object.
        this.suits[card.suit].push(card);
        this.values[card.rank].push(card);
      }
    }

    this.values.reverse();
    this.isPossible = this.solve();
  }

  /**
     * Compare current hand with another to determine which is the winner.
     * @param  {Hand} a Hand to compare to.
     * @return {Number}
     */
  compare(a) {
    if (this.rank < a.rank) {
      return 1;
    } else if (this.rank > a.rank) {
      return -1;
    }

    let result = 0;
    for (let i=0; i<=4; i++) {
      if (this.cards[i] && a.cards[i] && this.cards[i].rank < a.cards[i].rank) {
        result = 1;
        break;
      } else if (this.cards[i] && a.cards[i] && this.cards[i].rank > a.cards[i].rank) {
        result = -1;
        break;
      }
    }

    return result;
  }

  /**
     * Determine whether a hand loses to another.
     * @param  {Hand} hand Hand to compare to.
     * @return {Boolean}
     */
  loseTo(hand) {
    return (this.compare(hand) > 0);
  }

  /**
     * Determine the number of cards in a hand of a rank.
     * @param  {Number} val Index of this.values.
     * @return {Number} Number of cards having the rank, including wild cards.
     */
  getNumCardsByRank(val) {
    const cards = this.values[val];
    let checkCardsLength = (cards) ? cards.length : 0;

    for (let i=0; i<this.wilds.length; i++) {
      if (this.wilds[i].rank > -1) {
        continue;
      } else if (cards) {
        if (this.game.wildStatus === 1 || cards[0].rank === values.length - 1) {
          checkCardsLength += 1;
        }
      } else if (this.game.wildStatus === 1 || val === values.length - 1) {
        checkCardsLength += 1;
      }
    }

    return checkCardsLength;
  }

  /**
     * Determine the cards in a suit for a flush.
     * @param  {String} suit Key for this.suits.
     * @param  {Boolean} setRanks Whether to set the ranks for the wild cards.
     * @return {Array} Cards having the suit, including wild cards.
     */
  getCardsForFlush(suit, setRanks) {
    let cards = (this.suits[suit] || []).sort(Card.sort);

    for (let i=0; i<this.wilds.length; i++) {
      const wild = this.wilds[i];

      if (setRanks) {
        let j=0;
        while (j<values.length && j<cards.length) {
          if (cards[j].rank === values.length-1-j) {
            j += 1;
          } else {
            break;
          }
        }
        wild.rank = values.length-1-j;
        wild.wildValue = values[wild.rank];
      }

      cards.push(wild);
      cards = cards.sort(Card.sort);
    }

    return cards;
  }

  /**
     * Resets the rank and wild values of the wild cards.
     */
  resetWildCards() {
    for (let i=0; i<this.wilds.length; i++) {
      this.wilds[i].rank = -1;
      this.wilds[i].wildValue = this.wilds[i].value;
    }
  }

  /**
     * Highest card comparison.
     * @return {Array} Highest cards
     */
  nextHighest() {
    let picks;
    let excluding = [];
    excluding = excluding.concat(this.cards);

    picks = this.cardPool.filter( (card) => {
      if (excluding.indexOf(card) < 0) {
        return true;
      }
    });

    // Account for remaining wild card when it must be ace.
    if (this.game.wildStatus === 0) {
      for (let i=0; i<picks.length; i++) {
        const card = picks[i];
        if (card.rank === -1) {
          card.wildValue = 'A';
          card.rank = values.length - 1;
        }
      }
      picks = picks.sort(Card.sort);
    }

    return picks;
  }

  /**
     * Return list of contained cards in human readable format.
     * @return {String}
     */
  toString() {
    const cards = this.cards.map( (c) =>{
      return c.toString();
    });

    return cards.join(', ');
  }

  /**
     * Return array of contained cards.
     * @return {Array}
     */
  toArray() {
    const cards = this.cards.map( (c) => {
      return c.toString();
    });

    return cards;
  }

  /**
     * Determine if qualifying hand.
     * @return {Boolean}
     */
  qualifiesHigh() {
    if (!this.game.lowestQualified || this.alwaysQualifies) {
      return true;
    }

    return (this.compare(Hand.solve(this.game.lowestQualified, this.game)) <= 0);
  }


  /**
     * Separate cards based on if they are wild cards.
     * @param  {Array} cards Array of cards (['Ad', '3c', 'Th', ...]).
     * @param  {Game} game Game being played.
     * @return {Array} [wilds, nonWilds] Wild and non-Wild Cards.
     */
  static stripWilds(cards, game) {
    let card;
    cards = cards || [''];
    const wilds = [];
    const nonWilds = [];

    for (let i=0; i<cards.length; i++) {
      card = cards[i];
      if (card.rank === -1) {
        wilds.push(cards[i]);
      } else {
        nonWilds.push(cards[i]);
      }
    }

    return [wilds, nonWilds];
  }
}


