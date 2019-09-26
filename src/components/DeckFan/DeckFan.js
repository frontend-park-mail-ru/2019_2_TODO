import {TextComponent} from "../TextComponent/Text.js";
import BaseComponent from "../BaseComponent/BaseComponent.js";

export class CardComponent extends BaseComponent{
    constructor(context) {
        super();
        this.context = context;
        this.template = Handlebars.compile(`
            <button class="card">
                <a class="cardNominal">{{Nominal}}</a>
                <a class="cardText">{{text}}</a>
            </button>`
        )
    }
}

const Cards = [{
    text: 'offline',
    nominal: 'A'
},  {
    text: 'online',
    nominal: 'K'
},  {
    text: 'your profile',
    nominal: 'Q'
},  {
    text: 'scoreboard',
    nominal:'J'
},  {
    text: 'about',
    nominal:'10'
}];


export class DeckFanComponent {
    constructor(parent = document.body) {
        this._parent = parent;
    }
    render() {
        const container = document.createElement('section');
        container.className = 'container';
        Cards.forEach(key => {
            const Card = new CardComponent({
                Nominal:key['nominal'],
                text: key['text'],
            });
            container.innerHTML += Card.render()
        });
        this._parent.appendChild(container);
    }
}