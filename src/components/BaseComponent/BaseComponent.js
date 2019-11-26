
/** Базовый класс для шаблонов,
 *  от которого они наследуются. */
export default class BaseComponent {
  /**
   * Создать BaseComponent.
   * @param {Object} context
   */
  constructor(context = null) {
    this.context = context;
    this.element = null;
    this.template = null;
    this.handlers = [];
    // this._needAuth = false;
    // this._forAuth = false;
  }

  /** Отрисовать
   * @return {HTMLElement} строка для подстановки в HTML.
   */
  render() {
    this.compile();
    return this.element;
  }
  /** Отрисовать*/
  compile() {
    if (!this.element) {
      const div = document.createElement('div');
      div.innerHTML = this.template(this.context);
      this.element = div.childNodes[0];
    }
  }
  /**
   * Обновить контекст
   * @param {Object} context
   */
  updateContext(context) {
    this.context = context;
    const div = document.createElement('div');
    div.innerHTML = this.template(this.context);
    this.element = div.lastChild;
  }
  /** Обновить эелемент*/
  updateElement() {
    const nextChild = this.element.nextSibling;
    const parent = this.element.parentElement;
    this.element.remove();
    if (nextChild) {
      parent.insertBefore(this.element, nextChild);
    } else {
      parent.appendChild(this.element);
    }
  }

  /**
   * Добавить хендлер
   * @param {string} event
   * @param {function} handler
   */
  addHandler(event, handler) {
    this.element.addEventListener(event, handler);
    this.handlers.push({event: event, handler: handler});
  }
  /** Убрать хендлеры*/
  removeHandlers() {
    this.handlers.forEach(({event}, {handler}) => {
      this.element.removeEventListener(event, handler)
    });
  }
  /** Удалить. */
  remove() {
    this.element.remove();
  }
}
