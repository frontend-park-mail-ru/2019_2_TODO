import BaseComponent from '../BaseComponent/BaseComponent.js';
import template from './UserPanel.hbs';

/**
 * Кнопки игрока
 */
export class UserPanel extends BaseComponent {
  /**
   *
   * @param {object} context - контекст
   */
  constructor(context) {
    super(context);
    this.template = template;
  }
}