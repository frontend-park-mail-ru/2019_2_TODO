import BaseComponent from '../BaseComponent/BaseComponent';
import template from './BotPanel.hbs';

/**
 * Счет бота
 */
export class BotPanel extends BaseComponent {
  /**
   * Создать панель
   * @param {object} context - контекст
   */
  constructor(context) {
    super(context);
    this.template = template;
  }
}