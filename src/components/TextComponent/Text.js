import BaseComponent from '../BaseComponent/BaseComponent.js';
import template from './TextComponent.hbs';
/** Класс для текста. */
export class TextComponent extends BaseComponent {
  /**
   * Создать текст
   * @param {string} context - контекст текста
   */
  constructor(context) {
    super();
    this.context = context;
    this.template = template;
  }
}
