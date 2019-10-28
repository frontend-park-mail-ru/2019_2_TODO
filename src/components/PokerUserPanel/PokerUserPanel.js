import BaseComponent from '../BaseComponent/BaseComponent.js';
import template from './PokerUserPanel.hbs';

/**
* asa
* */
export default class PokerUserPanel extends BaseComponent{
    constructor(context) {
        super(context);
        this.template = Handlebars.compile(`
            <div class="poker-user-panel" id="playerPanel">
                <h1 id="playerScore" class="poker-user-panel__score-bet">{{score}}</h1>
                <button id="firstButton" class="poker-user-panel__button">Call</button>
                <button id="secondButton" class="poker-user-panel__button">Check</button>
                <button id="thirdButton" class="poker-user-panel__button">Fold</button>
                <button id="fourthButton" class="poker-user-panel__button">Raise</button>
                <h1 id="playerBet" class="poker-user-panel__score-bet">{{bet}}</h1>
            </div>
        `)
    }
}