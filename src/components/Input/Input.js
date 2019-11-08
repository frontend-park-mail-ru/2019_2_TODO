import BaseComponent from '../BaseComponent/BaseComponent.js';
import template from './Input.hbs';
import {TextComponent} from '../TextComponent/Text.js';

/**
 * Класс для Input
 */
export class InputComponent extends BaseComponent {
  /**
   * Создать Input
   * @param {string} context - контекст для Input
   */
  constructor(context) {
    super();
    this.context = context;
    this.template = template;
  }
}

/** Класс ошибки ввода в Input */
class InputError {
  /**
   * Создать Input
   */
  constructor() {
    this._errText = null;
  }
  /**
   * Вывести сообщение об ошибке
   * @param {string} err - тип ошибки
   * @param {HTMLElement} parent - родитель
   */
  e(err, parent) {
    if (this._errText) {
      parent.removeChild(document.getElementById('Err'));
    }
    switch (err) {
      case 'NO_USERNAME': {
        this._errText = new TextComponent({
          tag: 'a',
          class: 'error',
          text: 'No username',
          id: 'Err',
        });
        parent.innerHTML += this._errText.render();
        break;
      }
      case 'PASSWORD_LENGTH': {
        this._errText = new TextComponent({
          tag: 'a',
          class: 'error',
          text: 'Password too short',
          id: 'Err',
        });
        parent.innerHTML += this._errText.render();
        break;
      }
      case 'PASSWORDS_MATCH': {
        this._errText = document.createElement('a');
        this._errText.className = 'error';
        this._errText.textContent = 'Passwords are not equal';
        this._errText.id = 'Err';
        parent.appendChild(this._errText);
        break;
      }
    }
  }
}

export default new InputError();
