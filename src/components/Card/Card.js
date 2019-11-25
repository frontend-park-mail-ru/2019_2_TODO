import BaseComponent from '../BaseComponent/BaseComponent';
import template from './Card.hbs';

export class Card extends BaseComponent {
  constructor(context) {
    super(context);
    this.template = template;
  }
}
