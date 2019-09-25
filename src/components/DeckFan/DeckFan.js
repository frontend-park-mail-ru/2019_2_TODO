import {TextComponent} from "../TextComponent/Text.js";
import MainComponent from "../MainComponent/MainComponent.js";

export class CardComponent extends MainComponent{
    constructor(context) {
        super();
        this.context = context;
        this.template = Handlebars.compile(`
            <button class="{{card}}">
                        <a class="cardNominal">{{Nominal}}</a>
                        <a class="cardText">{{text}}</a>
            </button>`)}
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
            const Card = new CardComponent({card: key, Nominal:Cards[key][1], text: Cards[key][0]});
            container.innerHTML += Card.render()
        });
        this._parent.appendChild(container);
    }
}