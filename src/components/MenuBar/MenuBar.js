import BaseComponent from '../BaseComponent/BaseComponent';
import template from './MenuBar.hbs';

/** Меню*/
export class MenuBar extends BaseComponent {
  /**
   * Создать
   * @param {Object} context
   */
  constructor(context) {
    super(context);
    this.template = template;
  }
}
