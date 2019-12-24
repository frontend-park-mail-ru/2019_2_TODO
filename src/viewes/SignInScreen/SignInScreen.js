import {HeaderComponent} from '../../components/Header/Header.js';
import {TextComponent} from '../../components/TextComponent/Text.js';
import InputError, {InputComponent} from '../../components/Input/Input.js';
import {ButtonComponent} from '../../components/Button/Button.js';
import BaseView from '../BaseView/BaseView.js';

/** Авторизация*/
export default class SignInScreen extends BaseView {
  /**
   * Создать
   * @param {HTMLElement} element
   */
  constructor(element) {
    super(element);
  }
  /** Отрисовать*/
  render() {
    this.el.innerHTML = '';
    const application = this.el;
    const header = new HeaderComponent(application);
    header.render();
    const form = document.createElement('form');
    form.noValidate = true;
    const Text = new TextComponent({
      tag: 'h3',
      text: 'Authorization!',
    });
    form.appendChild(Text.render());
    const EmailInput = new InputComponent({
      id: 'email',
      type: 'email',
      placeholder: 'Username',
      class: 'input',
    });
    form.appendChild(EmailInput.render());
    const PassInput = new InputComponent({
      id: 'password',
      type: 'password',
      placeholder: 'Password',
      class: 'input',
    });
    form.appendChild(PassInput.render());
    const SubmitButton = new ButtonComponent({
      type: 'submit',
      class: 'button-small',
      text: 'Sign in!',
    });
    form.appendChild(SubmitButton.render());
    application.appendChild(form);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = form.elements.email;
      const password = form.elements.password;
      if (!email.value.length) {
        InputError.e('NO_USERNAME', form);
        password.value = '';
        return;
      }
      if (password.value.length < 4) {
        password.value = '';
        InputError.e('PASSWORD_LENGTH', form);
        return;
      }
      user.auth(email.value, password.value);
    }
    );
  }
}


