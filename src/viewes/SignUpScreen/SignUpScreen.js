import InputError, {InputComponent} from '../../components/Input/Input.js';
import {HeaderComponent} from '../../components/Header/Header.js';
import {ButtonComponent} from '../../components/Button/Button.js';
import {TextComponent} from '../../components/TextComponent/Text.js';
import BaseView from '../BaseView/BaseView.js';

/** Регистрация*/
export default class SignUpScreen extends BaseView {
  /**
   * @param {HTMLElement} element - контейнер HTML,
   * в котором отрисовывается верстка
   */
  constructor(element) {
    super(element);
  }
  /** Отрисовать*/
  render() {
    const application = this.el;
    application.innerHTML = '';
    const header = new HeaderComponent(application);
    header.render();
    const form = document.createElement('form');
    form.noValidate = true;
    application.appendChild(form);
    const Text = new TextComponent({
      tag: 'h3',
      text: 'Registration!',
    });
    form.innerHTML += Text.render();
    const EmailInput = new InputComponent({
      type: 'email',
      id: 'emailR',
      error: 'NO_USERNAME',
      placeholder: 'Email',
      class: 'input',
    });
    form.innerHTML += EmailInput.render();
    const PassInput = new InputComponent({
      type: 'password',
      id: 'passwordR',
      error: 'PASSWORD_LENGTH',
      placeholder: 'Password',
      class: 'input',
    });
    form.innerHTML += PassInput.render();
    const PassRepeat = new InputComponent({
      type: 'password',
      id: 'passwordRepeat',
      error: 'PASSWORD_REPEAT',
      placeholder: 'Repeat your password',
      class: 'input',
    });
    form.innerHTML += PassRepeat.render();
    const SubmitButton = new ButtonComponent({
      type: 'submit',
      text: 'Sign up!',
      class: 'button-small',
    });
    form.innerHTML += SubmitButton.render();
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const email = form.elements.emailR;
      const userName = email.value;
      const password = form.elements.passwordR;
      const passwordRepeat = form.elements.passwordRepeat;
      if (!email.value.length) {
        InputError.e('NO_USERNAME', form);
        password.value = '';
        passwordRepeat.value = '';
        form.elements.email = userName;
        return;
      }
      if (password.value !== passwordRepeat.value) {
        password.value = '';
        passwordRepeat.value = '';
        InputError.e('PASSWORDS_MATCH', form);
        email.value = userName;
        return;
      }
      if (password.value.length < 5) {
        password.value = '';
        passwordRepeat.value = '';
        InputError.e('PASSWORD_LENGTH', form);
        email.value = userName;
        return;
      }
      email.value = userName;
      user.signUp(email.value, password.value);
    });
  }
}
