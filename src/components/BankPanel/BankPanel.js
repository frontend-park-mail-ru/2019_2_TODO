import BaseComponent from '../BaseComponent/BaseComponent.js';
import template from './BankPanel.hbs';

export class BankPanel extends BaseComponent {
  constructor(context) {
    super(context);
    this.template = template;
  }
}
