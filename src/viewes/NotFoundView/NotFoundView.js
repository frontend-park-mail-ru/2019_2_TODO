import BaseView from '../BaseView/BaseView.js';
import {TextComponent} from '../../components/TextComponent/Text.js';

/** View для не найденных страниц*/
export default class NotFoundView extends BaseView {
  /**
     * Создать
     * @param {Object} element
     */
  constructor(element) {
    super(element);
  }
  /** Отрисовать*/
  render() {
    this.el.innerHTML = '';
    const application = document.createElement('section');
    const text = new TextComponent(
        {
          tag: 'h1',
          text: 'Not Found',
          class: 'notfound',
        });
    application.innerHTML = text.render();
    this.el.appendChild(application);
  }
}
