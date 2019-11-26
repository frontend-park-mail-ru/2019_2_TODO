import BaseView from '../BaseView/BaseView.js';
import {TextComponent} from '../../components/TextComponent/Text.js';


export default class NotFoundView extends BaseView {
  constructor(element) {
    super(element);
  }

  render() {
    this.el.innerHTML = '';
    const application = document.createElement('section');
    const back = new TextComponent({
        tag: 'a',
        text: 'back',
        class: 'back',
        href: '/',
    });
    application.appendChild(back.render());
    const text = new TextComponent(
        {
          tag: 'h1',
          text: 'Not Found',
          class: 'notfound',
        });
    application.appendChild(text.render());
    this.el.appendChild(application);
  }
}
