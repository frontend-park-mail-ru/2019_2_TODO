import BaseComponent from "../BaseComponent/BaseComponent.js";


export default class PokerUserPanel extends BaseComponent{
    constructor(context) {
        super(context);
        this.template = Handlebars.compile(`
            <div class="poker-user-panel">
                <a id="playerScore" class="poker-user-panel__score-bet">{{score}}</a>
                <button id="check" class="poker-user-panel__button">check</button>
                <button id="fold" class="poker-user-panel__button">fold</button>
                <button id="raise" class="poker-user-panel__button">raise</button>
                <a id="playerBet" class="poker-user-panel__score-bet">{{bet}}</a>
            </div>
        `)
    }
}