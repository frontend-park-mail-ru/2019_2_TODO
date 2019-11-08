
import BaseComponent from '../BaseComponent/BaseComponent.js';
import template from './ButtonPanel.hbs';

/**
 * Кнопки
 */
export class ButtonPanel extends BaseComponent {
  /**
   *
   * @param {object} context - контекст
   */
  constructor(context) {
    super(context);
    this.template = template;
  }
}
