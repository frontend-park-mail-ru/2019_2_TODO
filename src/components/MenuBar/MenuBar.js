import BaseComponent from '../BaseComponent/BaseComponent';
import template from './MenuBar.hbs';

export class MenuTemplate extends BaseComponent {
  constructor(context) {
    super(context);
    this.template = template;
  }
}

export class MenuBar {
  constructor(parent) {
    this._parent = parent;
  }

  render() {
    const menuTemplate = new MenuTemplate();
    this._parent.innerHTML += menuTemplate.render();
  }
}