// import {ButtonComponent} from '../Button/Button.js';
// import {TextComponent} from '../TextComponent/Text.js';
// import {ImageComponent} from '../Image/Image.js';
// import {StartScreen} from '../viewes/StartScreen/StartScreen.js';
// import {signUpScreen} from '../viewes/SignUpScreen/SignUpScreen.js';
// import {signInScreen} from '../viewes/SignInScreen/SignInScreen.js';
import {InfoBar} from '../InfoBar/InfoBar.js';
import BaseComponent from '../BaseComponent/BaseComponent';
import template from './Header.hbs';

// import {InputComponent} from '../Input/Input.js';


class Header extends BaseComponent {
  constructor(context) {
    super(context);
    this.template = template;
  }
}

/** Класс заголовка */
export class HeaderComponent {
  /**
   * Создать заголовок.
   * @param {HTMLElement} parent - родитель
   * @param {boolean} authorized - флаг авторизации
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
      this._parent.innerHTML += head.render();
    } else {
      const infoBar = new InfoBar({
        avatar: this._avatar,
        username: this._username,
      });
      const head = new Header({
        hiddenSign: 'hidden',
      });
      this._parent.innerHTML += head.render() + infoBar.render();
    }
  }
}
