import {Card} from '../../components/Card/Card';


export class PokerCSSAnimation {
  constructor(players) {
    this.shining = undefined;
    this.players = players;
  }
  startRoundAnimation(players = this.players) {
    this.players = players;
    const newRound = document.getElementById('newRoundSpan');
    newRound.innerText = 'New Round';
    newRound.hidden = false;
    newRound.style.animation = 'fly-in-out 3s';
    newRound.addEventListener('animationend', () => {
      newRound.style.animation = '';
      newRound.hidden = true;
    }, {once: true});

    let i = 0;
    this.players.forEach((id) => {
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
        container.appendChild(card.render());
      }, 0);
    });
    const bankContainer = document.getElementById('bankerCardId');
    this.bankerCards.forEach((id) => {
      const card = new Card({
        cardId: id,
      });
      bankContainer.appendChild(card.render());
    });
    this.players.forEach((id) => {
      this[id].forEach((cardId) => {
        document.getElementById(cardId).dataset['nominal'] = '';
        document.getElementById(cardId).hidden = false;
      });
    });
    this.bankerCards.forEach((card) => {
      document.getElementById(card).dataset['nominal'] = '';
    });
  }

  showPlayerCards(id, cards) {
    for (let i = 0; i < cards.length; i++) {
      document.getElementById(this[id][i]).dataset['nominal'] = cards[i];
    }
  }

  showBankCards(indexes, cards) {
    let i = 0;
    indexes.reduce((delay, index) => {
      setTimeout(() => {
        document.getElementById(this.bankerCards[index]).addEventListener('animationend', ()=>{
          i++;
          if (i===indexes.length) {
            dispatchEvent(new Event('sync'));
          }
        }, {once: true});
        document.getElementById(this.bankerCards[index]).dataset['nominal'] = cards[index];
        document.getElementById(this.bankerCards[index]).hidden = false;
      }, delay);
      return delay + 400;
    }, 0);
  }

  removePlayerCards(id) {
    this[id].forEach((cardId) => {
      document.getElementById(cardId).hidden = true;
    });
  }

  removeAllCards() {
    this.removeShine(this.shining);
    this.players.forEach((id) => {
      this[id].forEach((cardId) => {
        document.getElementById(cardId).remove();
      });
    });
    this.bankerCards.forEach((card) => {
      document.getElementById(card).remove();
    });
  }

  showWinnerCards(cards) {
    // document.getElementById('user').parentElement.style.border = 'none';
    // document.getElementById('bot').parentElement.style.border = 'none';
    const cardsIds = [];
    this.bankerCards.forEach((id) => {
      const card = document.getElementById(id);
      if (cards.includes(card.dataset['nominal'])) {
        cardsIds.push(id);
      }
    });
    this.players.forEach((id) => {
      this[id].forEach((cardId) => {
        const card = document.getElementById(cardId);
        if (cards.includes(card.dataset['nominal'])) {
          cardsIds.push(cardId);
        }
      });
    });
    cardsIds.forEach((id) => {
      const c = document.getElementById(id);
      c.style.animation = 'winCard 3s';
      c.addEventListener('animationend', () => {
        c.style.animation = '';
      }, {once: true});
    });
  }

  shinePlayer(id) {
    this.removeShine(this.shining);
    document.getElementById(id).parentElement.style.border = '2px solid gold';
    this.shining = id;
  }

  removeShine(id) {
    if (id !== undefined) {
      document.getElementById(id).parentElement.style.border = 'none';
      console.log(id);
    }
  }


}
