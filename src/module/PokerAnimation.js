

const card = new Image();
card.src = 'http://localhost:8000/assets/depositphotos_22388649-stock-photo-playing-card-ace-of-spades.jpg';
const back = new Image();
back.src = 'http://localhost:8000/assets/b151b48f2d77cdd03b17256ce25886a5.jpg';

const jobs = {};

const bankerCoordinates = {x:432, y: 160};
const playerCoordinates = {x:432, y: 440};
const bankerCardsCoordinates = {x: 292, y: 260};
const bank = [card,card,card,card,card];
const bankBack = [back,back,back,back,back];
const playerCards = [card, card];
const playerCardsBack = [back, back];
let counter = 0;
export const pokerGame = () => {
    //closeCard(card, back);
    Object.keys(jobs).forEach(key=>{
        if(jobs[key]!==null){
            // console.log([...jobs[key][1]]);
            jobs[key][0](key, jobs[key][1]);
        }
    });
    window.requestAnimationFrame(pokerGame);
};
const givePlayerCardsInit = (key, props) =>{

    givePlayerCards(props.cards);
    counter+=4;
    if (bankerCoordinates.y+counter > playerCoordinates.y){
        jobs[key] = null;
        counter = 80;
        jobs.reverseCards = [closeCardInit, {cards: playerCards, coordinates: playerCoordinates}];
        dispatchEvent(new Event('reversCards'))
    }
};
const closeCardInit = (key, props)=>{
    console.log(props);
    closeCard(props.cards, props.coordinates);
    if (counter <= -80){
        jobs[key] = null;
    }
};

const bankerCardsInit = (key, props) => {
    // console.log(cards);
    bankerCards(props.cards)
};



const givePlayerCards = (cards)=>{
    const ctx = document.getElementById('canvas').getContext('2d');
    console.log(cards);
    cards.reduce((change, val) => {
        ctx.clearRect(bankerCoordinates.x + change,bankerCoordinates.y+counter-4, 80, 150);
        ctx.drawImage(val,bankerCoordinates.x + change,bankerCoordinates.y+counter, 80, 150);
        return change + 90;
    }, 0);
};

const closeCard = (cards, coordinates = playerCoordinates) => {

    const ctx = document.getElementById('canvas').getContext('2d');

    cards.reduce((change, val) => {
        ctx.clearRect(coordinates.x+ 38-counter/2 + change, coordinates.y, counter+4, 150); // clear canvas
        let image;
        console.log('sac');
        counter-= 4;
        if (counter < 0){
            image = val
        } else {
            image = back
        }

        ctx.drawImage(image, coordinates.x+38-counter/2 + change, coordinates.y,counter,150);
        counter+=4;
        return change +90;
    }, 0);
    counter = counter - 2;


};




const bankerCards = (cards)=>{
    const ctx = document.getElementById('canvas').getContext('2d');
    // console.log(cards);
    cards.reduce((change, val) => {
        // console.log(val)
        ctx.drawImage(val, bankerCardsCoordinates.x + change, bankerCardsCoordinates.y,80,150);
        return change + 90;
    }, 0);
};
window.addEventListener('reversCards', () => {
    jobs.bankerCards = null;
    jobs.reverseBank = [closeCardInit, {cards: bank, coordinates: bankerCardsCoordinates}]
});
jobs.bankerCards = [bankerCardsInit, {cards: bankBack}];
jobs.giveCards = [givePlayerCardsInit, {cards: playerCardsBack}];


export default class PokerGame {
    constructor(){
        this.jobs = {};
        this.playerCard = [];
        this.bankCards = [];
    }

    startAnimation(){
        Object.keys(this.jobs).forEach(key=>{
            if(this.jobs[key]!==null){
                // console.log([...jobs[key][1]]);
                this.jobs[key][0](key, this.jobs[key][1]);
            }
        });
        window.requestAnimationFrame(this.startAnimation)
    }


}