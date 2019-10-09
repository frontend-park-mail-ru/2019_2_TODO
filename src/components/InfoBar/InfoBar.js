import {ImageComponent} from '../Image/Image.js';
import {TextComponent} from '../TextComponent/Text.js';
import {ButtonComponent} from '../Button/Button.js';
import AjaxModule from '../../module/ajax.js';

const application = document.getElementById('application');

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
      class: 'infoBar__avatar',
      section: 'profile',
      source: this._avatar,
    });
    infoBar.innerHTML += avatar.render();
    const username = new TextComponent({
      tag: 'a',
      class: 'infoBar__username',
      section: 'profile',
      text: this._username,
    });
    infoBar.innerHTML += username.render();
    const logOutButton = document.createElement('button');
      logOutButton.textContent = 'Log out';
      logOutButton.classNames = 'infoBar__logOutButton';
      logOutButton.type = 'submit';
      logOutButton.addEventListener('click', evt => {
      evt.preventDefault();
      AjaxModule.logOut(application);
    });
      infoBar.appendChild(logOutButton);
    this._parent.appendChild(infoBar);
  }
}
