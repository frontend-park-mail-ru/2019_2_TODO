import BaseView from '../BaseView/BaseView.js';
import {TextComponent} from '../../TextComponent/Text.js';


export default class NotFoundView extends BaseView {
  constructor(element) {
    super(element);
  }

  render() {
    const application = document.createElement('section');
    const text = new TextComponent(
        {
          tag: 'h1',
          text: 'Not Found',
          class: 'notfound',
        });
    application.innerText = text.render();
    this.el.appendChild(application);
  }
}
