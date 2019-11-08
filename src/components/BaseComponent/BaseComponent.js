/** Базовый класс для шаблонов,
 *  от которого они наследуются. */
export default class BaseComponent {
  /**
   * Создать BaseComponent.
   * @param {object} context - контекст
   * */
  constructor(context = null) {
    this.context = context;
    this.element = null;
    this.template = null;
  }

  /** Отрисовать
   * @return {string} строка для подстановки в HTML.
   */
  render() {
    if (!this.element) {
      this.element = this.template(this.context);
    }
    return this.element;
  }

  /**
   *
   * @param {object} context - контекст
   */
  updateContext(context) {
    this.context = context;
    this.element = this.template(this.context);
  }

  /** Удалить. */
  remove() {
    this.element.parentElement.removeChild(this.element);
  }
}
