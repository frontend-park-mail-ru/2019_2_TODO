// import {ImageComponent} from '../Image/Image.js';
// import {TextComponent} from '../TextComponent/Text.js';
// import {ButtonComponent} from '../Button/Button.js';
import BaseComponent from '../BaseComponent/BaseComponent';
import template from './InfoBar.hbs';

// import AjaxModule from '../../../module/ajax.js';

export class InfoBar extends BaseComponent {
  constructor(context) {
    super(context);
    this.template = template;
  }
}

/** Класс для инвормации о пользователе
export class InfoBar {
  /!**
   * Создать InfoBar
   * @param {HTMLElement} parent - родитель
   * @param {string} username - имя пользователя
   * @param {string} avatar - URL автарки поьзователя
   *!/
  constructor() {
    // this._username = window.username;
    // this._avatar = window.avatar;
  }

  /!** отрисовать InfoBar*!/
  render() {
    const infoBar = new InfoBar_();
    this.el.innerHTML += infoBar.render();
    // const infoBar = document.createElement('div');
    // infoBar.className = 'infoBar';
    // const avatar = new ImageComponent({
    //   class: 'infoBar__avatar',
    //   section: 'profile',
    //   source: this._avatar,
    // });
    // infoBar.innerHTML += avatar.render();
    // const username = new TextComponent({
    //   tag: 'a',
    //   class: 'infoBar__username',
    //   href: 'profile',
    //   section: 'profile',
    //   text: this._username,
    // });
    // infoBar.innerHTML += username.render();
    // const logOutButton = new ButtonComponent({
    //   text: 'Log out',
    //   class: 'button infoBar__logOutButton',
    //   type: 'submit',
    //   section: 'logout',
    //   id: 'logout',
    // });
    // infoBar.innerHTML += logOutButton.render();
    // this._parent.appendChild(infoBar);
  }
}*/
