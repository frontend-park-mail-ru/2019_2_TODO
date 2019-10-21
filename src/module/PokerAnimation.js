

const card = new Image();
card.src = 'http://93.171.139.195:780/assets/As.png';
const back = new Image();
back.src = 'http://93.171.139.195:780/assets/b151b48f2d77cdd03b17256ce25886a5.jpg';

const jobs = {};

let started = false;
const bankerCoordinates = {x:432, y: 120};
const playerCoordinates = {x:432, y: 460};
const bankerCardsCoordinates = {x: 292, y: 290};
let bank = [card,card,card,card,card];
let bankBack = [back,back,back,back,back];
let playerCards = [card, card];
let playerCardsBack = [back, back];
let differ = 0;

export const isStarted = () => {
    return started
};

export const addPlayerCards = (cards)=>{
    const result = [];
    cards.forEach((val) => {
       const card = new Image();
       card.src = 'http://93.171.139.195:780/assets/'+val+'.png';
       result.push(card);
    });
    playerCards = result;
    // playerCardsBack = playerCards;
    playerCardsBack.forEach((val, index) => {
        playerCardsBack[index] = back;
    })
};
export const addBankCards = (cards)=>{
    bank = cards;
    bankBack = bank;
    bankBack.forEach(val => {
        val = back;
    })
};

export const addJob = (key, func, props)=>{
    jobs[key] = [func, props];
};

export const pokerGame = () => {
    //reversCard(card, back);
    // console.log(jobs);
    started = true;
    Object.keys(jobs).forEach(key=>{
        if(jobs[key]!==null){
            jobs[key][0](key, jobs[key][1]);
        }
    });
    window.requestAnimationFrame(pokerGame);
};
export const givePlayerCardsInit = (key, props = {cards: playerCardsBack}) =>{

    givePlayerCards(props.cards);
    differ+= 4;
    if (bankerCoordinates.y + differ > playerCoordinates.y){
        jobs[key] = null;
        differ = 80;
        jobs.reverseCards = [closeCardInit, {cards: playerCards, coordinates: playerCoordinates}];
        dispatchEvent(new Event('reversCards'))
    }
};
export const closeCardInit = (key, props)=>{
    // console.log(props);
    reversCard(props.cards, props.coordinates);
    if (differ <= -80){
        jobs[key] = null;
    }
};

export const bankerCardsInit = (key, props = {cards: bankBack, coordinates: bankerCardsCoordinates}) => {
    // console.log(cards);
    bankerCards(props.cards, props.coordinates)
};
export const botCardsInit = (key, props = {cards: playerCardsBack, coordinates: bankerCoordinates}) => {
    // console.log(cards);
    bankerCards(props.cards, props.coordinates)
};


const givePlayerCards = (cards)=>{
    const ctx = document.getElementById('canvas').getContext('2d');
    // console.log(cards);
    cards.reduce((change, val) => {
        ctx.clearRect(bankerCoordinates.x + change,bankerCoordinates.y+differ-4, 80, 150);
        ctx.drawImage(val,bankerCoordinates.x + change,bankerCoordinates.y+differ, 80, 150);
        return change + 90;
    }, 0);
};

const reversCard = (cards, coordinates = playerCoordinates) => {

    const ctx = document.getElementById('canvas').getContext('2d');

    cards.reduce((change, val) => {
        ctx.clearRect(coordinates.x+ 36-differ/2 + change, coordinates.y, differ+8, 150); // clear canvas
        let image;
        // console.log('sac');
        differ-= 8;
        if (differ < 0){
            image = val
        } else {
            image = back
        }

        ctx.drawImage(image, coordinates.x+38-differ/2 + change, coordinates.y,differ,150);
        differ+=4;
        return change +90;
    }, 0);
    differ = differ - 2;
    // console.log(differ);

};

const bankerCards = (cards, coordinates)=>{
    const ctx = document.getElementById('canvas').getContext('2d');
    // console.log(cards);
    cards.reduce((change, val) => {
        // console.log(val)
        ctx.drawImage(val, coordinates.x + change, coordinates.y,80,150);
        return change + 90;
    }, 0);
};

window.addEventListener('reversCards', () => {
    jobs.bankCards = null;
    jobs.botCards = null;
    // differ = 80;
    //jobs.reverseBank = [closeCardInit, {cards: bank, coordinates: bankerCardsCoordinates}]
});
// jobs.botCards = [bankerCardsInit, {cards: playerCardsBack, coordinates: bankerCoordinates}];
// jobs.bankCards = [bankerCardsInit, {cards: bankBack, coordinates: bankerCardsCoordinates}];
// jobs.giveCards = [givePlayerCardsInit, {cards: playerCardsBack}];
