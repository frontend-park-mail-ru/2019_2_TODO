import BaseComponent from '../BaseComponent/BaseComponent.js';
import template from './BankPanel.hbs';

/**
 * Общий счет раунда
 */
export class BankPanel extends BaseComponent {
  /**
   *
   * @param {object} context - контекст
   */
  constructor(context) {
    super(context);
    this.template = template;
  }
}
