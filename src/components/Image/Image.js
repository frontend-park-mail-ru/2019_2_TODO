import BaseComponent from '../BaseComponent/BaseComponent.js';

/** Класс представляющий картинку */
export class ImageComponent extends BaseComponent {
  /**
   * Создать картинку
   * @param {string} context - контекст картинки
   */
  constructor(context) {
    super();
    this.context = context;
    this.template = Handlebars.compile(`      
            <img src="{{source}}" data-section="{{section}}"
             class="{{class}}" alt=""/>
        `);
  }
}
