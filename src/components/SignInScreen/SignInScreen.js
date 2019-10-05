import {HeaderComponent} from '../Header/Header.js';
import {TextComponent} from '../TextComponent/Text.js';
import {InputComponent} from '../Input/Input.js';
import {ButtonComponent} from '../Button/Button.js';
import {startScreen} from '../StartScreen/StartScreen.js';
import AjaxModule from '../../module/ajax.js';
import InputError from '../Input/Input.js';

/*
* @param {HTMLElement} application - контейнер HTML,
* в котором отрисовывается верстка
 */
export const signInScreen = (application) => {
  application.innerHTML = '';
  const header = new HeaderComponent(application);
  header.render();
  const form = document.createElement('form');
  form.noValidate = true;
  application.appendChild(form);
  const Text = new TextComponent({
    tag: 'h3',
    text: 'Authorization!',
  });
  form.innerHTML += Text.render();
  const EmailInput = new InputComponent({
    id: 'email',
    type: 'email',
    placeholder: 'Email',
  });
  form.innerHTML += EmailInput.render();
  const PassInput = new InputComponent({
    id: 'password',
    type: 'password',
    placeholder: 'Password',
  });
  form.innerHTML += PassInput.render();
  const SubmitButton = new ButtonComponent({
    type: 'submit',
    text: 'Sign in!',
  });
  form.innerHTML += SubmitButton.render();
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = form.elements.email;
    const password = form.elements.password;
    if (!email.value.length) {
      InputError.e('NO_USERNAME', form);
      password.value = '';
      return;
    }
    if (password.value.length < 5) {
      password.value = '';
      InputError.e('PASSWORD_LENGTH', form);
      return;
    }
    AjaxModule.fetchPost(
        'http://93.171.139.196:780/signin/',
        JSON.stringify({
          username: email.value,
          password: password.value,
        })
    )
        .then((res) => {
          if (res.status === 200) {
            console.log('sdcsdv');
            startScreen(application);
          }
        });
  });
};
