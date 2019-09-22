import {TextComponent} from "../TextComponent/Text.js";


export class CardComponent {
    constructor(parent = document.body, data ='', className = '') {
        this._parent = parent;
        this._data = data;
        this._className = className;
    }
    render(data = this._data, className = this._className) {
        const card = document.createElement('div');
        card.className = className;
        this._parent.appendChild(card);
        const text = new TextComponent(card, 'a', data, 'card')
        text.render()
    }
}
export class DeckFanComponent {
    constructor(parent = document.body) {
        this._parent = parent;
    }

    render() {
        const container = document.createElement('section');
        container.className = 'container';
        const Card = new CardComponent(container, 'B', 'firstCard');
        Card.render();
        Card.render('9', 'secondCard');
        Card.render('K', 'thirdCard');
        Card.render('A', 'fourthCard');
        Card.render('10', 'fifthCard');
        Card.render('Q', 'sixthCard');
        Card.render('8', 'seventhCard');
        this._parent.appendChild(container);
    }
}