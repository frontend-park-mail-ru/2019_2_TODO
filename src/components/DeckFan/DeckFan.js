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
        const text = new TextComponent(card, 'a', data, 'card')
        text.render()
    }
}
export class DeckFanComponent {
    constructor(parent = document.body) {
        this._parent = parent;
    }

    render() {
        const Cards = {
            'offline': 'firstCard',
            'online': 'secondCard',
            'your profile': 'thirdCard',
            'scoreboard': 'fourthCard',
            'about': 'fifthCard',
        };
        const container = document.createElement('section');
        container.className = 'container';
        Object.keys(Cards).forEach(key => {
            const Card = new ButtonComponent(container, key, Cards[key]);
            Card.render();
        });

        this._parent.appendChild(container);
    }
}