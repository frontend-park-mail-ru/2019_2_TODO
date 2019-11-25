
/**
 * @class BaseView
 * @module BaseView
 */
export default class BaseView {
  constructor(element) {
    this.el = element;

    this.el.dataset.view = this.constructor.name;
    this.el.hidden = true;
  }

  get active() {
    return !this.el.hidden;
  }

  hide() {
    this.el.innerHTML = '';
  }

  show() {
    this.render();
  }

  render() {

  }
}
