import {TextComponent} from "../TextComponent/Text.js";
import {ButtonComponent} from "../Button/Button.js";


export class CardComponent {
    constructor(parent = document.body, data ='', className = '') {
        this._parent = parent;
        this._data = data;
        this._className = className;
    }
    render(data = this._data, className = this._className) {
        const card = document.createElement('button');
        card.className = className;
        this._parent.appendChild(card);
        const nominal = new TextComponent(card, 'a', data[1], 'cardNominal');
        nominal.render();
        const text = new TextComponent(card, 'a', data[0], 'card');
        text.render();

    }
}

const Cards = {
    'firstCard': ['offline', 'A'],
    'secondCard': ['online', 'K'],
    'thirdCard': ['your profile', 'Q'],
    'fourthCard': ['scoreboard', 'J'],
    'fifthCard': ['about', '10']
};


export class DeckFanComponent {
    constructor(parent = document.body) {
        this._parent = parent;
    }

    render() {

        const container = document.createElement('section');
        container.className = 'container';
        Object.keys(Cards).forEach(key => {
            const Card = new CardComponent(container, Cards[key], key);
            Card.render();
        });

        this._parent.appendChild(container);
    }
}