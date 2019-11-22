import {HeaderComponent} from '../../components/Header/Header.js';
import {TextComponent} from '../../components/TextComponent/Text.js';
import InputError, {InputComponent} from '../../components/Input/Input.js';
import {ButtonComponent} from '../../components/Button/Button.js';
import AjaxModule from '../../module/AjaxModule/ajax.js';
import BaseView from '../BaseView/BaseView.js';


export default class SignInScreen extends BaseView {
  constructor(element) {
    super(element);
  }

  render() {
    this.el.innerHTML = '';
    const application = document.createElement('section');
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
      class: 'input',
    });
    form.innerHTML += EmailInput.render();
    const PassInput = new InputComponent({
      id: 'password',
      type: 'password',
      placeholder: 'Password',
      class: 'input',
    });
    form.innerHTML += PassInput.render();
    const SubmitButton = new ButtonComponent({
      type: 'submit',
      class: 'button-small',
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
      user.auth(email.value, password.value);
    }
    );
    this.el.appendChild(application);
  }
}


