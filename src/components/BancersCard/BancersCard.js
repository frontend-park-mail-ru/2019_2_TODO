import BaseComponent from '../BaseComponent/BaseComponent';
import template from './BancersCard.hbs';

export class BankersCard extends BaseComponent {
  constructor(context) {
    super(context);
    this.template = template;
  }
}