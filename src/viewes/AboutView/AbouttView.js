import BaseView from '../BaseView/BaseView';
import {HeaderComponent} from '../../components/Header/Header';
import {TextComponent} from '../../components/TextComponent/Text';

export default class AboutView extends BaseView {
  constructor(element) {
    super(element);
  }

  render() {
    this.el.innerHTML = '';
    const application = this.el;
    const header = new HeaderComponent(application);
    header.render();
    const text = new TextComponent({
      tag: 'h1',
      class: 'about',
      text: ' Made by TODO!',
    });
    application.appendChild(text.render());
  }
}
