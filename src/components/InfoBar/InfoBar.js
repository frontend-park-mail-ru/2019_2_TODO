import {ImageComponent} from '../Image/Image.js';
import {TextComponent} from '../TextComponent/Text.js';
import {ButtonComponent} from '../Button/Button.js';

/** Класс для инвормации о пользователе*/
export class InfoBar {
  /**
     * Создать InfoBar
     * @param {HTMLElement} parent - родитель
     * @param {string} username - имя пользователя
     * @param {string} avatar - URL автарки поьзователя
     */
  constructor(parent, username, avatar) {
    this._parent = parent;
    this._username = username;
    this._avatar = avatar;
  }
  /** отрисовать InfoBar*/
  render() {
    const infoBar = document.createElement('div');
    infoBar.className = 'infoBar';
    const avatar = new ImageComponent({
      class: 'avatar',
      section: 'profile',
      source: this._avatar,
    });
    infoBar.innerHTML += avatar.render();
    const username = new TextComponent({
      tag: 'a',
      class: 'username',
      text: this._username,
    });
    infoBar.innerHTML += username.render();
    const logOutButton = new ButtonComponent({
      text: 'Log out',
      class: 'logOutButton',
      type: 'submit',
    });
    infoBar.innerHTML += logOutButton.render();
    this._parent.appendChild(infoBar);
  }
}
