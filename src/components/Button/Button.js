import BaseComponent from '../BaseComponent/BaseComponent.js';
import template from './Button.hbs';

/** Класс представляющий кнопку. */
export class ButtonComponent extends BaseComponent {
  /** Создать кнопку
   * @param {string} context - контекст для кнопки.
   */
  constructor(context) {
    super(context);
    this.template = template;
  }
}