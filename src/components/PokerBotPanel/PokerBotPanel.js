import BaseComponent from "../BaseComponent/BaseComponent.js";


export class PokerBotPanel extends BaseComponent{
    constructor(context) {
        super(context);
        this.template = Handlebars.compile(`
            <div class="poker-bot-panel">
                <a id="botScore" class="poker-bot-panel__score-bet">{{score}}</a>
                <a id="botBet" class="poker-bot-panel__score-bet">{{bet}}</a>
            </div>
        `)
    }
}