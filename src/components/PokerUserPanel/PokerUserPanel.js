import BaseComponent from '../BaseComponent/BaseComponent.js';
import template from './PokerUserPanel.hbs';

/**
 * Кнопки игрока
 * */
export default class PokerUserPanel extends BaseComponent {
  /**
   *
   * @param {object} context - контекст
   */
  constructor(context) {
    super(context);
    this.template = template;
  }
}
