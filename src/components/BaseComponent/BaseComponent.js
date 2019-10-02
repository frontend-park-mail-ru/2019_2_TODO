
/*
* Базовый класс для шаблонов, от
* которого они наследуются.
*/

export default class BaseComponent {
  constructor() {
    this.context = null;
    this.element = null;
    this.template = null;
    // this._needAuth = false;
    // this._forAuth = false;
  }

  render() {
    if (!this.element) {
      this.element = this.template(this.context);
    }
    return this.element;
  }

  remove() {
    this.element.parentElement.removeChild(this.element);
  }
}
