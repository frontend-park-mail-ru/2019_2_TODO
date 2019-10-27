import BaseComponent from "../BaseComponent/BaseComponent.js";


export class PokerBotPanel extends BaseComponent{
    constructor(context) {
        super(context);
        this.template = Handlebars.compile(`
            <div class="poker-bot-panel" id="botPanel">
                <h1 id="botScore" class="poker-bot-panel__score-bet">{{score}}</h1>
                <button id="botFirstButton" class="poker-user-panel__button">Call</button>
                <button id="botSecondButton" class="poker-user-panel__button">Check</button>
                <button id="botThirdButton" class="poker-user-panel__button">Fold</button>
                <button id="botFourthButton" class="poker-user-panel__button">Raise</button>
                <h1 id="botBet" class="poker-bot-panel__score-bet">{{bet}}</h1>
            </div>
        `)
    }
}