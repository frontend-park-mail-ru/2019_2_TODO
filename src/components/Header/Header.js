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
    this._avatar = avatar;
    this._username = username;
  }


  /**
   * Отрисовать заголовок
   */
  render() {
    if (!user.isAuth) {
      const head = new Header({
        hiddenSign: '',
      });
      this._parent.appendChild(head.render());
      head.render().children[0].children[0].addEventListener('click', (event)=>{
        event.preventDefault();
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
      head.render().appendChild(infoBar.render());
      this._parent.appendChild(head.render());
    }
  }
}
