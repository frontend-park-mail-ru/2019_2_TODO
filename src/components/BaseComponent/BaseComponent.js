export default class BaseComponent {
  constructor () {
    this.context = null
    this.element = null
    this.template = null
    // this._needAuth = false;
    // this._forAuth = false;
  }

  render () {
    if (!this.element) {
      this.element = this.template(this.context)
    }
    return this.element
  }

  remove () {
    this.element.parentElement.removeChild(this.element)
  }

  // compile(context) {
  //     if (context.needAuth === 'true') {
  //         this._needAuth = true;
  //     } else if (context.forAuth === 'true') {
  //         this._forAuth = true;
  //     }
  // }
  // hide() {
  //     if (this.element) {
  //         this.element.style.display = 'none';
  //     }
  // }
  // show() {
  //     if (this.element) {
  //         this.element.style.display = 'block';
  //     }
  // }
}
