import BaseComponent from '../BaseComponent/BaseComponent.js';
import template from './Image.hbs';

/** Класс представляющий картинку */
export class ImageComponent extends BaseComponent {
  /**
   * Создать картинку
   * @param {string} context - контекст картинки
   */
  constructor(context) {
    super();
    this.context = context;
    this.template = template;
  }
}
