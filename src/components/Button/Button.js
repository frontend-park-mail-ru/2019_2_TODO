import BaseComponent from '../BaseComponent/BaseComponent.js';

/** Класс представляющий кнопку. */
export class ButtonComponent extends BaseComponent {
  /** Создать кнопку
   * @param {string} context - контекст для кнопки.
   */
  constructor(context) {
    super(context);
    this.template = Handlebars.compile(`
            <button type="{{type}}" class="{{class}}" id="{{id}}" 
            data-section="{{section}}">{{text}}</button>
        `);
  }
}