
/**
 * @class BaseView
 * @module BaseView
 */
export default class BaseView {
  constructor(element) {
    this.el = element;

    this.el.dataset.view = this.constructor.name;
    // this.el.hidden = false;
    this.isActive = false;
  }

  get active() {
    return this.isActive;
  }

  hide() {
    this.isActive = false;
    this.el.innerHTML = '';
  }

  show() {
    this.isActive = true;
    this.render();
  }

  render() {

  }
}
