import BaseComponent from "../BaseComponent/BaseComponent.js";


export class PokerBotPanel extends BaseComponent{
    constructor(context) {
        super(context);
        this.template = Handlebars.compile(`
            <div class="poker-bot-panel" id="botPanel">
                <h1 id="botScore" class="poker-bot-panel__score-bet">score:
                {{score}}</h1>
                <h1 id="botBet" class="poker-bot-panel__score-bet">bet:
                {{bet}}</h1>
            </div>
        `)
    }
}