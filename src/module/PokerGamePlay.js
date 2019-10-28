import {PokerAnimation} from "./PokerAnimation.js";
import OfflineGameView from "../components/viewes/OfflineGame/OfflineGameView.js";
// import {Hand} from './pokerSolver/PokerSolver.j;'


const baseDeck = [
    '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', 'Td', 'Jd', 'Qd', 'Kd', 'Ad',
    '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', 'Th', 'Jh', 'Qh', 'Kh', 'Ah',
    '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'Ts', 'Js', 'Qs', 'Ks', 'As',
    '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', 'Tc', 'Jc', 'Qc', 'Kc', 'Ac',
];

export const updateScoreBet = () => {
    document.getElementById('playerBet').innerText = window.sessionStorage.playerBet;
    document.getElementById('playerScore').innerText = window.sessionStorage.playerScore;
    document.getElementById('botScore').innerText = window.sessionStorage.botScore;
    document.getElementById('botBet').innerText = window.sessionStorage.botBet;
};

export class game{
    constructor(){
        this.deck = baseDeck;
        this.playerHand = null;
        this.botHand = null;
        this.bankCards = null;
        this.botCards = null;
        this.animation = new PokerAnimation();
        this._callCheck = false;
        this._stage = 0;
        if (isNaN(sessionStorage.playerScore)||
            sessionStorage.playerScore <=0 ||
            isNaN(sessionStorage.botScore) ||
            sessionStorage.botScore <= 0) {

            sessionStorage.dealer = 'player';
            sessionStorage.secondPlayer = 'bot';
            sessionStorage.playerScore = 1000;
            sessionStorage.botScore = 1000;
            sessionStorage.botBet = 0;
            sessionStorage.playerBet = 0;
        }
        this.bot();
        updateScoreBet();
    }

    startRound() {
        this._stage = 0;
        OfflineGameView.disableButtonPanel('playerPanel');
        this.deck = baseDeck;
        sessionStorage.botScore -= -sessionStorage.botBet - sessionStorage.playerBet;
        sessionStorage.playerBet = 0;
        sessionStorage.botBet = 0;
        updateScoreBet();
        const playersCards = this.getRandomHand(2);
        const botsCards = this.getRandomHand(2);
        const bankCards = this.getRandomHand(5);
        this.bankCards = bankCards;
        this.botCards = botsCards;
        this.playerHand = Hand.solve([...playersCards, ...bankCards]);
        this.botHand = Hand.solve([...botsCards, ...bankCards]);
        console.log(Hand.winners([this.playerHand, this.botHand]));

        // const canvas = document.getElementById('canvas');
        this.animation.startRoundAnimation(playersCards, botsCards, bankCards);
        const startAnimationListener = () => {
            this.bets();
            if (sessionStorage.dealer !== 'player'){
                OfflineGameView.enableButtonPanel('playerPanel');
            }
            removeEventListener('endOfStartAnimation', startAnimationListener)
        };
        addEventListener('endOfStartAnimation', startAnimationListener);

    }
    endRound(){
        const winners = Hand.winners([this.playerHand, this.botHand]);
        if (winners.length === 2) {
            sessionStorage.playerScore -= -sessionStorage.playerBet;
            sessionStorage.botScore -= -sessionStorage.botBet;
            sessionStorage.botBet = 0;
            sessionStorage.playerBet = 0;
        } else {
            if (this.playerHand === winners[0]) {
                sessionStorage.playerScore -= -sessionStorage.playerBet
                    -(sessionStorage.botBet>=sessionStorage.playerBet?sessionStorage.playerBet:sessionStorage.botBet);
                sessionStorage.botBet = 0;
                sessionStorage.playerBet = 0;
            } else {
                sessionStorage.botScore -= -sessionStorage.botBet
                    -(sessionStorage.botBet >=sessionStorage.playerBet?sessionStorage.playerBet:sessionStorage.botBet);
                sessionStorage.botBet = 0;
                sessionStorage.playerBet = 0;
            }

        }
        updateScoreBet();
        setTimeout(this.animation.removeAllCards, 3000);
        const listener = () => {
          removeEventListener('roundAnimationEnd', listener);
          this.startRound();
        };
        addEventListener('roundAnimationEnd', listener);
    }
    raise(evt = null, value){
        const func = (evt, value) => {

            const intValue = parseInt(value);
            if (evt.target.parentElement.id === 'playerPanel'){
                if (sessionStorage.playerScore >= intValue) {
                    sessionStorage.playerScore -= intValue;
                    sessionStorage.playerBet -= -intValue;
                    console.log(sessionStorage.playerBet)
                } else {
                    console.log(2);
                    sessionStorage.playerBet -= -sessionStorage.playerScore;
                    sessionStorage.playerScore = 0;
                }
                dispatchEvent(new Event('raise'));
            } else {
                if (sessionStorage.botScore >= intValue) {
                    sessionStorage.botScore -= intValue;
                    sessionStorage.botBet -= -intValue;
                } else {
                    sessionStorage.botBet -= -sessionStorage.botScore;
                    sessionStorage.botScore = 0;
                }
                OfflineGameView.enableButtonPanel('playerPanel');
            }
            updateScoreBet();
            this._callCheck = true;
        };
        func(evt, value);
    };
    fold(evt) {
        const func = (evt) => {

            if (evt.target.parentElement.id === 'playerPanel') {
                sessionStorage.botScore -= -sessionStorage.playerBet - sessionStorage.botBet;
                sessionStorage.playerBet = 0;
                sessionStorage.botBet = 0;
            } else {
                sessionStorage.playerScore -= -sessionStorage.playerBet - sessionStorage.botBet;
                sessionStorage.botBet = 0;
                sessionStorage.playerBet = 0;
            }
            updateScoreBet();
            this.animation.removeAllCards();
            const listener = () => {
                removeEventListener('roundAnimationEnd', listener);
                this.startRound();
            };
            addEventListener('roundAnimationEnd', listener);
        };
        func(evt);
    };
    check(evt){
        const func = (evt) => {
            if (this._callCheck){
                this._callCheck = false;
                this.nextStage();
            } else {
                this._callCheck = true;
            }
            if (evt.target.parentElement.id === 'playerPanel') {
                dispatchEvent(new Event('check'));
            } else {
                OfflineGameView.enableButtonPanel('playerPanel');
            }
        };
        func(evt);
    };
    nextStage(){
        const func = () => {
            // console.log(this.bankCards.slice(0,3));
            if (this._stage === 0) {
                this.animation.reverseBankerCards(this.bankCards, [0, 1, 2]);
            } else if (this._stage === 1) {
                console.log(this.bankCards.slice(3, 4));
                this.animation.reverseBankerCards(this.bankCards, [3]);
            } else if (this._stage === 2) {
                this.animation.reverseBankerCards(this.bankCards, [4]);
            } else if (this._stage === 3) {
                const listener = () => {
                    this.endRound();
                    removeEventListener('endOfRound', listener)
                };
                addEventListener('endOfRound',listener);
                this.animation.reverseBotCards(this.botCards, 'endOfRound');
            }
            this._stage++;
        };
        func();
    };


    call(evt) {
        const func = evt => {
            const botBet = parseInt(sessionStorage.botBet);
            const playerBet = parseInt(sessionStorage.playerBet);
            const botScore = parseInt(sessionStorage.botScore);
            const playerScore = parseInt(sessionStorage.playerScore);
            if (evt.target.parentElement.id === 'playerPanel') {

                if (botBet > playerBet) {
                    if (playerScore < botBet - playerBet) {
                        sessionStorage.playerBet -= -playerScore;
                        sessionStorage.playerScore = 0;
                    } else {
                        sessionStorage.playerScore -= botBet - playerBet;
                        sessionStorage.playerBet = botBet;
                    }
                } else {

                }
                dispatchEvent(new Event('call'))
            } else {
                if (botBet < playerBet) {
                    if (botScore < playerBet - botBet) {
                        sessionStorage.botBet -= botScore;
                        sessionStorage.botScore = 0;
                    } else {
                        sessionStorage.botScore -= playerBet - botBet;
                        sessionStorage.botBet = playerBet;
                    }
                }
                OfflineGameView.enableButtonPanel('playerPanel');
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
        }else {
            sessionStorage.botBet = 20;
            sessionStorage.playerBet = 40;
            sessionStorage.botScore -= sessionStorage.botBet;
            sessionStorage.playerScore -= sessionStorage.playerBet;
            sessionStorage.dealer = 'player';
            sessionStorage.secondPlayer = 'bot';
            dispatchEvent(new Event('blind') )
        }
        updateScoreBet();
    }

    setPlayerHand(cards){
        this.playerHand = cards
    }
    getRandomHand(cardsNumber){
        const result = [];
        for (let i = 0; i < cardsNumber;) {
            const index = Math.floor(Math.random()*this.deck.length);
            const card = this.deck[index];
            this.deck[index] = null;
            if (card){
                result.push(card);
                i++;
            }
        }
        return result;
    };

    bot(){
        addEventListener('call', () => {
            setTimeout(() => {
                if (this.botHand.rank < 2) {
                    const evt = {};
                    evt.target = {};
                    evt.target.parentElement = {};
                    evt.target.parentElement.id = 'botPanel';
                    console.log(evt);
                    this.check(evt)
                } else {
                    const evt = {};
                    evt.target = {};
                    evt.target.parentElement = {};
                    evt.target.parentElement.id = 'botPanel';
                    console.log(evt);
                    this.raise(evt, 40);
                }
            }, 1000)
        });
        addEventListener('raise', () => {
            setTimeout( () => {
                if (this.botHand.rank < 2) {
                    const evt = {};
                    evt.target = {};
                    evt.target.parentElement = {};
                    evt.target.parentElement.id = 'botPanel';
                    console.log(evt);
                    this.fold(evt);
                } else if (this.botHand.rank < 5){
                    const evt = {};
                    evt.target = {};
                    evt.target.parentElement = {};
                    evt.target.parentElement.id = 'botPanel';
                    console.log(evt);
                    this.call(evt);
                } else {
                    const evt = {};
                    evt.target = {};
                    evt.target.parentElement = {};
                    evt.target.parentElement.id = 'botPanel';
                    console.log(evt);
                    this.raise(evt, 40);
                }
            }, 1000)
        });
        addEventListener('check', () =>{
            setTimeout( () => {
                if (this.botHand.rank < 2) {
                    const evt = {};
                    evt.target = {};
                    evt.target.parentElement = {};
                    evt.target.parentElement.id = 'botPanel';
                    console.log(evt);
                    this.check(evt);
                } else {
                    const evt = {};
                    evt.target = {};
                    evt.target.parentElement = {};
                    evt.target.parentElement.id = 'botPanel';
                    console.log(evt);
                    this.raise(evt, 40);
                }
            }, 1000)
        });
        addEventListener('blind', () => {
            setTimeout( () => {
                const evt = {};
                evt.target = {};
                evt.target.parentElement = {};
                evt.target.parentElement.id = 'botPanel';
                console.log(evt);
                this.call(evt);
            }, 1000)

        })
    }
}
