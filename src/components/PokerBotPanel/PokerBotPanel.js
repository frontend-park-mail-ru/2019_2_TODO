import BaseComponent from '../BaseComponent/BaseComponent.js';
import template from './PokerBotPanel.hbs';

export class PokerBotPanel extends BaseComponent{
    constructor(context) {
        super(context);
        this.template = template;
    }
}