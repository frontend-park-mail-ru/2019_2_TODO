import {Card} from '../../components/Card/Card';

export class PokerCSSAnimation {
  constructor(players) {
    this.shining = null;
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
          };
        } else {
          ctx = {
            cardId: cardId,
            second: 'card-second',
          };
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
    this.bankerCards.forEach(card => {
      document.getElementById(card).dataset['nominal'] = '';
    });
  }

  showPlayerCards(id, cards) {
    for (let i = 0; i < cards.length; i++) {
      document.getElementById(this[id][i]).dataset['nominal'] = cards[i];
    }
  }

  showBankCards(indexes, cards) {
    indexes.reduce((delay, index) => {
      setTimeout(() => {
        document.getElementById(this.bankerCards[index]).dataset['nominal'] = cards[index];
        document.getElementById(this.bankerCards[index]).hidden = false;
      }, delay);
      return delay + 400;
    }, 400);
  }
  removePlayerCards(id){
    this[id].forEach((cardId) => {
      document.getElementById(cardId).hidden = true;
    });
  }
  removeAllCards() {
    this.players.forEach((id) => {
      this[id].forEach((cardId) => {
        document.getElementById(cardId).hidden = true;
      });
    });
    this.bankerCards.forEach((card) => {
      document.getElementById(card).hidden = true;
    });
  }
  showWinnerCards(cards) {
    document.getElementById('user').parentElement.style.border = 'none';
    document.getElementById('bot').parentElement.style.border = 'none';
    let cardsIds = [];
    console.log(this.bankerCards);
    this.bankerCards.forEach(id=>{
      const card = document.getElementById(id);
      console.log(card.dataset['nominal']);
      if (cards.includes(card.dataset['nominal']) ){
        cardsIds.push(id);
      }
    });
    this.players.forEach(id=>{
      this[id].forEach(cardId=>{
        const card = document.getElementById(cardId);
        console.log(card.dataset['nominal']);
        if (cards.includes(card.dataset['nominal']) ){
          cardsIds.push(cardId);
        }
      })
    });
    cardsIds.forEach(id=>{
      const  c = document.getElementById(id);
      c.style.animation = 'winCard 3s';
      setTimeout(()=>{
        c.style.animation = '';
      }, 3000);
    });

  }
  shinePlayer(id){
    this.removeShine(this.shining);
    document.getElementById(id).parentElement.style.border = '2px solid gold';
    this.shining = id;
  }
  removeShine(id){
    if (id){
      document.getElementById(id).parentElement.style.border = 'none';
    }
  }
}