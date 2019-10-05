import {InputComponent} from '../Input/Input.js';
import {HeaderComponent} from '../Header/Header.js';
import {ButtonComponent} from '../Button/Button.js';
import {TextComponent} from '../TextComponent/Text.js';
import {StartScreen} from '../StartScreen/StartScreen.js';
import {SignInScreen} from '../SignInScreen/SignInScreen.js';
import AjaxModule from '../../module/ajax.js';

/*
* @param {HTMLElement} application - контейнер HTML,
* в котором отрисовывается верстка
 */
export const SignUpScreen = (application) => {
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
    id: 'email',
    error: 'EMAIL_FORMAT',
    placeholder: 'Email',
  });
  form.innerHTML += EmailInput.render();
  const PassInput = new InputComponent({
    type: 'password',
    id: 'password',
    error: 'PASSWORD_LENGTH',
    placeholder: 'Password',
  });
  form.innerHTML += PassInput.render();
  const PassRepeat = new InputComponent({
    type: 'password',
    id: 'passwordRepeat',
    error: 'PASSWORD_REPEAT',
    placeholder: 'Repeat your password',
  });
  form.innerHTML += PassRepeat.render();
  // const avatarInput = new InputComponent({
  //   type: 'file',
  //   id: 'avatarInput',
  //   placeholder: 'Upload avatar'
  // })
  // form.innerHTML += avatarInput.render();

  const SubmitButton = new ButtonComponent({
    href: '/',
    type: 'submit',
    text: 'Sign up!',
  });
  form.innerHTML += SubmitButton.render();

  form.addEventListener('submit', evt => {
    evt.preventDefault();
    const email = form.elements.email.value;
    const password = form.elements.password;
    const passwordRepeat = form.elements.passwordRepeat;
    if (password.value !== passwordRepeat.value) {
      PassRepeat.error('PASSWORDS_MATCH', form);
      return;
    }
    if (password.value.length < 5) {
      PassInput.error('PASSWORD_LENGTH', form);
      return;
    }

    AjaxModule.signUp(application, email, password.value);

  });
};
