import {PokerAnimation} from "./PokerAnimation.js";


const baseDeck = [
    '1d', '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', 'Td', 'Jd', 'Qd', 'Kd', 'Ad',
    '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', 'Th', 'Jh', 'Qh', 'Kh', 'Ah',
    '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'Ts', 'Js', 'Qs', 'Ks', 'As',
    '1c', '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', 'Tc', 'Jc', 'Qc', 'Kc', 'Ac',
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
        this.playerHand = [];
        this.botHand = [];
        this.bankHand = [];
        this.dealer = 'playerBet';
        window.sessionStorage.playerScore = 1000;
        window.sessionStorage.playerBet = 0;
        window.sessionStorage.botScore = 1000;
        window.sessionStorage.botBet = 0;
    }

    startRound(){
        // this.playerHand = this.getRandomHand(2);
        this.setPlayerHand(['As', 'Ah']);
        this.botHand = this.getRandomHand(2);
        this.bankHand = this.getRandomHand(5);
        const animation = new PokerAnimation();
        // const image = new Image();
        // image.src = 'http://localhost:8000/assets/Ah.png';
        // image.onload = () => {
        //     console.log(image)
        // };
        const canvas = document.getElementById('canvas');
        animation.givePlayerCards(['Ah', 'Ah']);
        // const listener = () => {
        //     animation.giveBankerCards([image, image, image, image, image]);
        //     canvas.removeEventListener('cardsReversed', listener)
        //
        // };
        // canvas.addEventListener('cardsReversed', listener);
        // animation.giveBankerCards([image, image, image, image, image]);
        // const listener = () => {
        //     animation.reverseBankerCards([image, image, image, image, image], [0,1,2,3,4]);
        //     canvas.removeEventListener('endMoveCards', listener)
        //
        // };
        // canvas.addEventListener('endMoveCards', listener);
        // animation.reverseBankerCards([image,image, image], 1)
        // animation.giveBotCards([image,image]);

    }

    blind() {
        if (this.dealer === 'playerBet') {
            this.dealer = 'botBet';
            window.sessionStorage.playerBet = 20;
            window.sessionStorage.playerScore -= window.sessionStorage.playerBet;
            window.sessionStorage.botBet = 0;
            return '20';
        }else {
            window.sessionStorage.botBet = 20;
            window.sessionStorage.playerBet = 0;
            window.sessionStorage.botScore -= window.sessionStorage.botBet;
            this.dealer = 'playerBet';
            return '0';
        }
    }

    setPlayerHand(cards){
        this.playerHand = cards
    }
    getRandomHand = (cardsNumber) =>{
        const result = [];
        for (let i = 0; i < cardsNumber;) {
            const card = this.deck[Math.floor(Math.random()*this.deck.length)];
            if (card){
                result.push(card);
                i++;
            }
        }
    };
}
