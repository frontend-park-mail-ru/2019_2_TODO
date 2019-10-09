import BaseComponent from '../BaseComponent/BaseComponent.js';

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
    this.template = Handlebars.compile(`
            <input type="{{type}}" id="{{id}}" href="{{href}}"
            placeholder="{{placeholder}}" class="{{class}}"
            value="{{text}}">
        `);
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
      this._errText.parentElement.removeChild(this._errText);
    }
    switch (err) {
      case 'NO_USERNAME': {
        this._errText = document.createElement('a');
        this._errText.className = 'error';
        this._errText.textContent = 'No username';
        this._errText.id = 'Err';
        parent.appendChild(this._errText);
        break;
      }
      case 'PASSWORD_LENGTH': {
        this._errText = document.createElement('a');
        this._errText.className = 'error';
        this._errText.textContent = 'Password is too short';
        this._errText.id = 'Err';
        parent.appendChild(this._errText);
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
