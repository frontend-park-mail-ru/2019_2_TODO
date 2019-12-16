import BaseComponent from '../BaseComponent/BaseComponent.js';
import template from './PokerUserPanel.hbs';

/**
 * asa
 * */
export default class PokerUserPanel extends BaseComponent {
  constructor(context) {
    super(context);
    this.template = template;
  }
}
