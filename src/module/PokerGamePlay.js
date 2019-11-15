import {PokerAnimation} from './PokerAnimation.js';
import OfflineGameView from '../components/viewes/OfflineGame/OfflineGameView.js';
import {PokerCSSAnimation} from "./PokerCSSAnimation";

const baseDeck = [
  '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', 'Td', 'Jd', 'Qd', 'Kd', 'Ad',
  '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', 'Th', 'Jh', 'Qh', 'Kh', 'Ah',
  '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'Ts', 'Js', 'Qs', 'Ks', 'As',
  '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', 'Tc', 'Jc', 'Qc', 'Kc', 'Ac',
];

export const updateScoreBet = () => {
  document.getElementById('userScore').innerText = `${window.sessionStorage.playerScore}/${window.sessionStorage.playerBet}`;
  document.getElementById('bank').innerText = window.sessionStorage.bank;
  document.getElementById('botScore').innerText = `${window.sessionStorage.botScore}/${window.sessionStorage.botBet}`;
};

export class game {
  constructor() {
    this.deck = [...baseDeck];
    this.playerHand = null;
    this.botHand = null;
    this.bankCards = null;
    this.botCards = null;
    this.animation = new PokerCSSAnimation(['user', 'bot']);
    this._callCheck = false;
    this._stage = 0;
    this._allIn = false;
    if (isNaN(sessionStorage.playerScore) ||
        sessionStorage.playerScore <= 0 ||
        isNaN(sessionStorage.botScore) ||
        sessionStorage.botScore <= 0) {
      sessionStorage.playerScore = 1000;
      sessionStorage.botScore = 1000;
      sessionStorage.botBet = 0;
      sessionStorage.playerBet = 0;
    }
    if (sessionStorage.dealer === 'player'){
      sessionStorage.dealer = 'player';
      sessionStorage.secondPlayer = 'bot';
    } else {
      sessionStorage.dealer = 'bot';
      sessionStorage.secondPlayer = 'player';
    }
    if (window.bot !== true) {
      this.bot();
    }
    window.bot = true;
    updateScoreBet();
  }

  startRound() {
    if (isNaN(sessionStorage.playerScore) ||
        sessionStorage.playerScore <= 0) {
      sessionStorage.playerScore = 1000;
      sessionStorage.botBet = 0;
    }
    if (isNaN(sessionStorage.botScore) ||
        sessionStorage.botScore <= 0) {
      sessionStorage.botScore = 1000;
      sessionStorage.playerBet = 0;
    }
    this._stage = 0;
    this._allIn = false;
    OfflineGameView.disableButtonPanel('playerPanel');
    this.deck = [...baseDeck];
    sessionStorage.botScore = parseInt(sessionStorage.botScore) + parseInt(sessionStorage.botBet);
    sessionStorage.playerScore = parseInt(sessionStorage.playerScore) + parseInt(sessionStorage.playerBet);
    sessionStorage.playerBet = 0;
    sessionStorage.bank = 0;
    sessionStorage.botBet = 0;
    updateScoreBet();
    const playersCards = this.getRandomHand(2);
    const botsCards = this.getRandomHand(2);
    const bankCards = this.getRandomHand(5);
    this.bankCards = bankCards;
    this.botCards = botsCards;
    this.playerHand = HandSolve([...playersCards, ...bankCards]);
    this.botHand = HandSolve([...botsCards, ...bankCards]);
    this.animation.startRoundAnimation();
    this.animation.showPlayerCards('user', playersCards)
    this.bets();
    if (sessionStorage.dealer !== 'player') {
      OfflineGameView.enableButtonPanel('call');
    }
  }

  endRound() {
    const winners = PokerWinners([this.playerHand, this.botHand]);
    if (winners.length === 2) {
      sessionStorage.playerScore = +sessionStorage.playerScore + sessionStorage.bank/2;
      sessionStorage.botScore -= +sessionStorage.botScore + sessionStorage.bank/2;
      sessionStorage.bank = 0;
      sessionStorage.botBet = 0;
      sessionStorage.playerBet = 0;
    } else {
      if (this.playerHand === winners[0]) {
        sessionStorage.playerScore -= -sessionStorage.bank;
        sessionStorage.bank = 0;
        sessionStorage.botBet = 0;
        sessionStorage.playerBet = 0;
      } else {
        sessionStorage.botScore -= -sessionStorage.bank;
        sessionStorage.bank = 0;
        sessionStorage.botBet = 0;

        sessionStorage.playerBet = 0;
      }
    }
    updateScoreBet();
    setTimeout(() => {
      this.animation.removeAllCards();
    }, 3000);
    // const listener = () => {
    //   removeEventListener('roundAnimationEnd', listener);

    setTimeout(() => {
      this.startRound();
    }, 4000);
    // };
    // addEventListener('roundAnimationEnd', listener);
  }

  raise(evt = null, value) {
    const func = (evt, value) => {
      let intValue = parseInt(value);
      if (evt.target.parentElement.id === 'playerPanel') {
        intValue += parseInt(sessionStorage.botBet);
        if (sessionStorage.playerScore > intValue) {
          sessionStorage.playerScore -= intValue;
          sessionStorage.playerBet -= -intValue;
        } else {
          sessionStorage.playerBet = parseInt(sessionStorage.playerBet) +
              Math.min(parseInt(sessionStorage.playerScore),
                  parseInt(sessionStorage.botScore) + parseInt(sessionStorage.botBet) - parseInt(sessionStorage.playerBet));
          sessionStorage.playerScore = Math.max(parseInt(sessionStorage.playerScore) - parseInt(sessionStorage.playerBet), 0);
          this._allIn = true;
        }
        dispatchEvent(new Event('raise'));
      } else {
        intValue += parseInt(sessionStorage.playerBet);
        if (sessionStorage.botScore > intValue) {
          sessionStorage.botScore -= intValue;
          sessionStorage.botBet -= -intValue;
        } else {
          // sessionStorage.botBet -= -sessionStorage.botScore;
          // sessionStorage.botScore = 0;
          sessionStorage.botBet = parseInt(sessionStorage.botBet) +
              Math.min(parseInt(sessionStorage.botScore),
                  parseInt(sessionStorage.playerScore) + parseInt(sessionStorage.playerBet) - parseInt(sessionStorage.botBet));
          sessionStorage.botScore = parseInt(sessionStorage.botScore) - sessionStorage.botBet;
          this._allIn = true;
        }
        OfflineGameView.enableButtonPanel('call');
      }
      updateScoreBet();
      this._callCheck = true;
    };
    func(evt, value);
  };

  fold(evt) {
    const func = (evt) => {
      sessionStorage.bank = parseInt(sessionStorage.bank) + parseInt(sessionStorage.botBet) + parseInt(sessionStorage.playerBet);
      if (evt.target.parentElement.id === 'playerPanel') {
        sessionStorage.botScore = parseInt(sessionStorage.bank) + parseInt(sessionStorage.botScore);
        sessionStorage.playerBet = 0;
        sessionStorage.botBet = 0;
      } else {
        sessionStorage.playerScore = parseInt(sessionStorage.bank) + parseInt(sessionStorage.playerScore);
        sessionStorage.botBet = 0;
        sessionStorage.playerBet = 0;
      }
      updateScoreBet();
      this.animation.removeAllCards();
      setTimeout(()=>{
        this.startRound();
      }, 500);
    };

    func(evt);
  };

  check(evt) {
    const func = (evt) => {
      if (this._callCheck) {
        this._callCheck = false;
        this.nextStage();
      } else {
        this._callCheck = true;
      }
      if (evt.target.parentElement.id === 'playerPanel') {
        dispatchEvent(new Event('check'));
      } else {
        OfflineGameView.enableButtonPanel('check');
      }
    };
    func(evt);
  };

  nextStage(allin = false) {
    const func = () => {
      sessionStorage.bank = parseInt(sessionStorage.bank) +
          (parseInt(sessionStorage.botBet) +
              parseInt(sessionStorage.playerBet));
      sessionStorage.playerBet = 0;
      sessionStorage.botBet = 0;
      if (this._allIn) {
        this.animation.showBankCards([0, 1, 2, 3, 4], this.bankCards);
        this.animation.showPlayerCards('bot', this.botCards);
        setTimeout(()=>{
          this.endRound();
          updateScoreBet();
        }, 2500);
        return;
      }
      if (this._stage === 0) {
        this.animation.showBankCards([0, 1, 2], this.bankCards);
      } else if (this._stage === 1) {
        this.animation.showBankCards([3], this.bankCards);
      } else if (this._stage === 2) {
        this.animation.showBankCards([4], this.bankCards);
      } else if (this._stage === 3) {
        this._stage++;
        this.animation.showPlayerCards('bot', this.botCards);
        this.endRound();
        return;
      }
      this._stage++;
      updateScoreBet();

    };
    func();
  };

  call(evt) {
    const func = (evt) => {
      const botBet = parseInt(sessionStorage.botBet);
      const playerBet = parseInt(sessionStorage.playerBet);
      const botScore = parseInt(sessionStorage.botScore);
      const playerScore = parseInt(sessionStorage.playerScore);
      if (evt.target.parentElement.id === 'playerPanel') {
        if (botBet > playerBet) {
          if (playerScore < botBet - playerBet) {
            sessionStorage.playerBet = parseInt(sessionStorage.playerBet) +
                playerScore;
            sessionStorage.playerScore = 0;
            this._allIn = true;
          } else {
            sessionStorage.playerScore -= botBet - playerBet;
            sessionStorage.playerBet = botBet;
          }
        } else {
        }
        dispatchEvent(new Event('call'));
      } else {
        if (botBet < playerBet) {
          if (botScore < playerBet - botBet) {
            sessionStorage.botBet = parseInt(sessionStorage.botBet) + botScore;
            sessionStorage.botScore = 0;
            this._allIn = true;
          } else {
            sessionStorage.botScore = parseInt(sessionStorage.botScore) -
                (playerBet - botBet);
            sessionStorage.botBet = playerBet;
          }
        }
        OfflineGameView.enableButtonPanel('check');
      }
      updateScoreBet();
      if (this._callCheck) {
        this._callCheck = false;
        this.nextStage();
      } else {
        this._callCheck = true;
      }
    };
    func(evt);
  }


  bets() {
    // document.getElementById('firstButton').textContent = 'Call';
    // document.getElementById('secondButton').textContent = 'Check';
    // document.getElementById('thirdButton').textContent = 'Fold';
    // document.getElementById('fourthButton').textContent = 'Raise';
    if (sessionStorage.dealer === 'player') {
      sessionStorage.playerBet = 20;
      sessionStorage.botBet = 40;
      sessionStorage.playerScore -= sessionStorage.playerBet;
      sessionStorage.botScore -= sessionStorage.botBet;
      sessionStorage.dealer = 'bot';
      sessionStorage.secondPlayer = 'player';
    } else {
      sessionStorage.botBet = 20;
      sessionStorage.playerBet = 40;
      sessionStorage.botScore -= sessionStorage.botBet;
      sessionStorage.playerScore -= sessionStorage.playerBet;
      sessionStorage.dealer = 'player';
      sessionStorage.secondPlayer = 'bot';
      dispatchEvent(new Event('blind'));
    }
    sessionStorage.bank = 0;
    updateScoreBet();
  }

  setPlayerHand(cards) {
    this.playerHand = cards;
  }

  getRandomHand(cardsNumber) {
    const result = [];
    for (let i = 0; i < cardsNumber;) {
      const index = Math.floor(Math.random() * this.deck.length);
      const card = this.deck[index];
      this.deck[index] = null;
      if (card) {
        result.push(card);
        i++;
      }
    }
    return result;
  };


  bot() {
    addEventListener('call', () => {
      // if (this._allIn){ return}
      setTimeout(() => {
        if (this._stage < 4) {
          if (this._allIn) {
            const evt = {};
            evt.target = {};
            evt.target.parentElement = {};
            evt.target.parentElement.id = 'botPanel';
            
            this.call(evt);
            return;
          }
          if (this.botHand.rank < 2) {
            const evt = {};
            evt.target = {};
            evt.target.parentElement = {};
            evt.target.parentElement.id = 'botPanel';
            this.check(evt);
          } else {
            const evt = {};
            evt.target = {};
            evt.target.parentElement = {};
            evt.target.parentElement.id = 'botPanel';
            this.raise(evt, 40);
          }
        }
      }, 1000);
    });
    addEventListener('raise', () => {
      setTimeout(() => {
        if (this._stage < 4) {
          if (this._allIn) {
            const evt = {};
            evt.target = {};
            evt.target.parentElement = {};
            evt.target.parentElement.id = 'botPanel';
            
            this.call(evt);
            return;
          }
          if (this.botHand.rank < 2) {
            const evt = {};
            evt.target = {};
            evt.target.parentElement = {};
            evt.target.parentElement.id = 'botPanel';
            
            this.fold(evt);
          } else if (this.botHand.rank < 5) {
            const evt = {};
            evt.target = {};
            evt.target.parentElement = {};
            evt.target.parentElement.id = 'botPanel';
            
            this.call(evt);
          } else {
            const evt = {};
            evt.target = {};
            evt.target.parentElement = {};
            evt.target.parentElement.id = 'botPanel';
            
            this.raise(evt, 40);
          }
        }
      }, 1000);
    });
    addEventListener('check', () => {
      setTimeout(() => {
        if (this._stage < 4) {
          if (this.botHand.rank < 2) {
            const evt = {};
            evt.target = {};
            evt.target.parentElement = {};
            evt.target.parentElement.id = 'botPanel';
            
            this.check(evt);
          } else {
            const evt = {};
            evt.target = {};
            evt.target.parentElement = {};
            evt.target.parentElement.id = 'botPanel';
            
            this.raise(evt, 40);
          }
        }
      }, 1000);
    });
    addEventListener('blind', () => {
      setTimeout(() => {
        const evt = {};
        evt.target = {};
        evt.target.parentElement = {};
        evt.target.parentElement.id = 'botPanel';
        
        this.call(evt);
      }, 1000);
    });
  }
}
