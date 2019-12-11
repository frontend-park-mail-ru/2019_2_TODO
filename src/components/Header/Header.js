import {InfoBar} from '../InfoBar/InfoBar.js';
import BaseComponent from '../BaseComponent/BaseComponent';
import template from './Header.hbs';

/** Хедер*/
class Header extends BaseComponent {
  /**
   * Создать
   * @param {Object} context
   */
  constructor(context) {
    super(context);
    this.template = template;
  }
}

/** Класс заголовка */
export class HeaderComponent {
  /**
   * Создать
   * @param {HTMLElement} parent
   * @param {boolean} authorized
   * @param {string} avatar
   * @param {string} username
   */
  constructor(
    parent = document.body,
    authorized = false,
    avatar = './assets/gold_fishka.jpg',
    username = 'nickname',
  ) {
    this._parent = parent;
    this._authorized = authorized;
    this._avatar = avatar;
    this._username = username;
  }


  /**
   * Отрисовать заголовок
   */
  render() {
    if (!this._authorized) {
      const head = new Header({
        hiddenSign: '',
      });
      this._parent.appendChild(head.render());
      document.getElementById('pokerDom').addEventListener('click', () => {
        router.open('/');
      });
    } else {
      const infoBar = new InfoBar({
        avatar: this._avatar,
        username: this._username,
      });
      const head = new Header({
        hiddenSign: 'hidden',
      });
      this._parent.appendChild(head.render());
      this._parent.appendChild(infoBar.render());
    }
  }
}
