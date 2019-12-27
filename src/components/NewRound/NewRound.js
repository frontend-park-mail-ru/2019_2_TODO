import BaseComponent from '../BaseComponent/BaseComponent';
import template from './NewRound.hbs';

export default class NewRound extends BaseComponent {
  constructor(element) {
    super(element);
    this.template = template;
  }
}
