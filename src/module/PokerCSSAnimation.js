import {Card} from "../components/Card/Card";

export class PokerCSSAnimation {
  constructor(players) {
    this.players = players;
    let i = 0;
    this.players.forEach(id => {
      this[id] = [];
      this[id].push('c' + i);
      i++;
      this[id].push('c' + i);
      i++;
    });
    this.bankerCards = ['b1', 'b2', 'b3', 'b4', 'b5'];
    this.players.forEach((id) => {
      const container = document.getElementById(id);
      this[id].reduce((i, cardId) => {
        let ctx;
        if (i === 0) {
          ctx = {
            cardId: cardId,
            // second: 'card-second',
          };
        } else {
          ctx = {
            cardId: cardId,
            second: 'card-second',
          }
        }
        const card = new Card(ctx);
        container.innerHTML += card.render();
      }, 0);
    });
    const bankContainer = document.getElementById('bankerCardId');
    this.bankerCards.forEach((id) => {
      const card = new Card({
        cardId: id,
      });
      bankContainer.innerHTML += card.render();
    });
  }

  startRoundAnimation() {
    this.players.forEach(id => {
      this[id].forEach(cardId => {
        document.getElementById(cardId).dataset['nominal'] = '';
        document.getElementById(cardId).hidden = false;
      })
    });
    this.bankerCards.forEach(card =>{
      document.getElementById(card).dataset['nominal'] = '';
      // document.getElementById(card).hidden = false;
    });
  }

  showPlayerCards(id, cards) {
    for (let i = 0; i < cards.length; i++) {
      document.getElementById(this[id][i]).dataset['nominal'] = cards[i];
    }
  }

  showBankCards(indexes, cards) {
    indexes.reduce((delay, index) => {
      setTimeout(()=>{
        document.getElementById(this.bankerCards[index]).dataset['nominal'] = cards[index];
        document.getElementById(this.bankerCards[index]).hidden = false;
      }, delay);
      return delay + 400;
    },400);
  }

  removeAllCards() {
    this.players.forEach(id => {
      this[id].forEach(cardId => {
        document.getElementById(cardId).hidden = true;
      });
    });
    this.bankerCards.forEach(card =>{
      document.getElementById(card).hidden = true;
    });
  }
}