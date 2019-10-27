import Card from '../Card/PokerCard.js';
import Hand from './Hand.js';

export default class Straight extends Hand {
  constructor(cards, game, canDisqualify) {
    super(cards, 'Straight', game, canDisqualify);
  }

  solve() {
    let card; let checkCards;
    this.resetWildCards();

    // There are still some games that count the wheel as second highest.
    // These games do not have enough cards/wilds to make AKQJT and 5432A both possible.
    if (this.game.wheelStatus === 1) {
      this.cards = this.getWheel();
      if (this.cards.length) {
        let wildCount = 0;
        for (let i=0; i<this.cards.length; i++) {
          card = this.cards[i];
          if (card.value === this.game.wildValue) {
            wildCount += 1;
          }
          if (card.rank === 0) {
            card.rank = values.indexOf('A');
            card.wildValue = 'A';
            if (card.value === '1') {
              card.value = 'A';
            }
          }
        }
        this.cards = this.cards.sort(Card.sort);
        for (; wildCount<this.wilds.length && this.cards.length < this.game.cardsInHand; wildCount++) {
          card = this.wilds[wildCount];
          card.rank = values.indexOf('A');
          card.wildValue = 'A';
          this.cards.push(card);
        }
        this.descr = this.name + ', Wheel';
        this.sfLength = this.sfQualify;
        if (this.cards[0].value === 'A') {
          this.cards = this.cards.concat(this.nextHighest().slice(1, this.game.cardsInHand-this.cards.length+1));
        } else {
          this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand-this.cards.length));
        }
        return true;
      }
      this.resetWildCards();
    }

    this.cards = this.getGaps();

    // Now add the wild cards, if any, and set the appropriate ranks
    for (let i=0; i<this.wilds.length; i++) {
      card = this.wilds[i];
      checkCards = this.getGaps(this.cards.length);
      if (this.cards.length === checkCards.length) {
        // This is an "open-ended" straight, the high rank is the highest possible rank.
        if (this.cards[0].rank < (values.length - 1)) {
          card.rank = this.cards[0].rank + 1;
          card.wildValue = values[card.rank];
          this.cards.push(card);
        } else {
          card.rank = this.cards[this.cards.length - 1].rank - 1;
          card.wildValue = values[card.rank];
          this.cards.push(card);
        }
      } else {
        // This is an "inside" straight, the high card doesn't change.
        for (let j=1; j<this.cards.length; j++) {
          if (this.cards[j-1].rank - this.cards[j].rank > 1) {
            card.rank = this.cards[j-1].rank - 1;
            card.wildValue = values[card.rank];
            this.cards.push(card);
            break;
          }
        }
      }
      this.cards = this.cards.sort(Card.sort);
    }
    if (this.cards.length >= this.game.sfQualify) {
      this.descr = this.name + ', ' + this.cards[0].toString().slice(0, -1) + ' High';
      this.cards = this.cards.slice(0, this.game.cardsInHand);
      this.sfLength = this.cards.length;
      if (this.cards.length < this.game.cardsInHand) {
        if (this.cards[this.sfLength-1].rank === 0) {
          this.cards = this.cards.concat(this.nextHighest().slice(1, this.game.cardsInHand-this.cards.length+1));
        } else {
          this.cards = this.cards.concat(this.nextHighest().slice(0, this.game.cardsInHand-this.cards.length));
        }
      }
    }

    return this.cards.length >= this.game.sfQualify;
  }

  /**
     * Get the number of gaps in the straight.
     * @return {Array} Highest potential straight with fewest number of gaps.
     */
  getGaps(checkHandLength) {
    let cardsToCheck;
    let i; let card; let gapCards; let cardsList; let gapCount; let prevCard; let diff;

    const stripReturn = Hand.stripWilds(this.cardPool, this.game);
    const wildCards = stripReturn[0];
    cardsToCheck = stripReturn[1];

    for (i=0; i<cardsToCheck.length; i++) {
      card = cardsToCheck[i];
      if (card.wildValue === 'A') {
        cardsToCheck.push(new Card('1' + card.suit));
      }
    }
    cardsToCheck = cardsToCheck.sort(Card.sort);

    if (checkHandLength) {
      i = cardsToCheck[0].rank + 1;
    } else {
      checkHandLength = this.game.sfQualify;
      i = values.length;
    }

    gapCards = [];
    for (; i>0; i--) {
      cardsList = [];
      gapCount = 0;
      for (let j=0; j<cardsToCheck.length; j++) {
        card = cardsToCheck[j];
        if (card.rank > i) {
          continue;
        }
        prevCard = cardsList[cardsList.length - 1];
        diff = (prevCard) ? prevCard.rank - card.rank : i - card.rank;

        if (diff === null) {
          cardsList.push(card);
        } else if (checkHandLength < (gapCount + diff + cardsList.length)) {
          break;
        } else if (diff > 0) {
          cardsList.push(card);
          gapCount += (diff - 1);
        }
      }
      if (cardsList.length > gapCards.length) {
        gapCards = cardsList.slice();
      }
      if (this.game.sfQualify - gapCards.length <= wildCards.length) {
        break;
      }
    }

    return gapCards;
  }

  getWheel() {
    let cardsToCheck;
    let i;
    let card;
    let wildCount;
    let cardFound;

    const stripReturn = Hand.stripWilds(this.cardPool, this.game);
    const wildCards = stripReturn[0];
    cardsToCheck = stripReturn[1];

    for (i=0; i<cardsToCheck.length; i++) {
      card = cardsToCheck[i];
      if (card.wildValue === 'A') {
        cardsToCheck.push(new Card('1' + card.suit));
      }
    }
    cardsToCheck = cardsToCheck.sort(Card.sort);

    const wheelCards = [];
    wildCount = 0;
    for (i = this.game.sfQualify-1; i>=0; i--) {
      cardFound = false;
      for (let j=0; j<cardsToCheck.length; j++) {
        card = cardsToCheck[j];
        if (card.rank > i) {
          continue;
        }
        if (card.rank < i) {
          break;
        }
        wheelCards.push(card);
        cardFound = true;
        break;
      }
      if (!cardFound) {
        if (wildCount < wildCards.length) {
          wildCards[wildCount].rank = i;
          wildCards[wildCount].wildValue = values[i];
          wheelCards.push(wildCards[wildCount]);
          wildCount += 1;
        } else {
          return [];
        }
      }
    }

    return wheelCards;
  }
}
