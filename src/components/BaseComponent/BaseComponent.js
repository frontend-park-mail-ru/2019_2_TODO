
/** Базовый класс для шаблонов,
 *  от которого они наследуются. */
export default class BaseComponent {
  /** Создать BaseComponent. */
  constructor(context = null) {
    this.context = context;
    this.element = null;
    this.template = null;
    // this._needAuth = false;
    // this._forAuth = false;
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

  /** Удалить. */
  remove() {
    this.element.parentElement.removeChild(this.element);
  }
}
