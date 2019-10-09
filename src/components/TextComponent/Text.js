import BaseComponent from '../BaseComponent/BaseComponent.js';

/** Класс для текста. */
export class TextComponent extends BaseComponent {
  /**
   * Создать текст
   * @param {string} context - контекст текста
   */
  constructor(context) {
    super();
    this.context = context;
    this.template = Handlebars.compile(`
            <{{tag}} class="{{class}}" id="{{id}}" href="{{href}}">
                {{text}}
            </{{tag}}>
        `);
  }
}
