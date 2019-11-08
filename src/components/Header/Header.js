import {InfoBar} from '../InfoBar/InfoBar.js';
import BaseComponent from '../BaseComponent/BaseComponent';
import template from './Header.hbs';

/**  */
class Header extends BaseComponent {
  /**
   *
   * @param {object} context - контекст
   */
  constructor(context) {
    super(context)
    this.template = template;
  }
}

/** Класс заголовка */
export class HeaderComponent {
  /**
   * Создать заголовок.
   * @param {HTMLElement} parent - родитель
   * @param {boolean} authorized - флаг авторизации
   * @param {boolean} back - флаг отображения обратной страницы
   */
  constructor(parent = document.body, authorized = false, back = false) {
    this._parent = parent;
    this._authorized = authorized;
    if (back) {
      this._back = 'hidden';
    } else {
      this._back = '';
    }
  }


  /**
   * Отрисовать заголовок
   */
  render() {
    if (!this._authorized) {
      const head = new Header({
        hiddenBack: this._back,
        hiddenSign: '',
      });
      this._parent.innerHTML += head.render();
    } else {
      const infoBar = new InfoBar({
        avatar: './assets/gold_fishka.jpg',
        username: 'nickname',
      });
      this._parent.innerHTML += infoBar.render();
      const head = new Header({
        hiddenBack: this._back,
        hiddenSign: 'hidden',
      });
      this._parent.innerHTML += head.render();
    }
  }
}
