import BaseComponent from '../BaseComponent/BaseComponent';
import template from './BotPanel.hbs';


export class BotPanel extends BaseComponent {
  constructor(context) {
    super(context);
    this.template = template;
  }
}