// import {ButtonComponent} from '../Button/Button.js';
import {TextComponent} from '../TextComponent/Text.js';
import {ImageComponent} from '../Image/Image.js';
// import {StartScreen} from '../viewes/StartScreen/StartScreen.js';
// import {signUpScreen} from '../viewes/SignUpScreen/SignUpScreen.js';
// import {signInScreen} from '../viewes/SignInScreen/SignInScreen.js';
import {InfoBar} from '../InfoBar/InfoBar.js';
import AjaxModule from '../../module/ajax.js';
// import {InputComponent} from '../Input/Input.js';

const application = document.getElementById('application');


/** Класс заголовка */
export class HeaderComponent {
  /**
   * Создать заголовок.
   * @param {HTMLElement} parent - родитель
   * @param {boolean} authorized - флаг авторизации
   */
  constructor(parent = document.body, authorized = false) {
    this._parent = parent;
    this._authorized = authorized;
  }

  /**
   * Отрисовать заголовок
   */
  render() {
    const head = document.createElement('header');
    head.className = 'header';
    head.id = 'header';
    const topSection = document.createElement('section');
    topSection.className = 'header__top-section';
    const backButton = new TextComponent({
      tag: 'a',
      text: 'Startscreen',
      href: '/',
      class: 'button header__button_back',
      section: 'start',
    });
    topSection.innerHTML += backButton.render();
    head.appendChild(topSection);
    const text = new TextComponent({
      tag: 'h1',
      class: '',
      text: 'Online Poker Game',
    });
    const chip = new ImageComponent({
      source: './assets/gold_fishka.jpg',
      class: 'chip',
      section: 'start',
    });
    if (!this._authorized) {
      const buttonColumn = document.createElement('div');
      buttonColumn.className = 'column';
      topSection.appendChild(buttonColumn);
      const signInButton = new TextComponent({
        tag: 'a',
        type: 'button',
        class: 'button header__sign-in-button',
        href: 'signIn',
        text: 'Sign in',
        section: 'signIn',
      });
      buttonColumn.innerHTML += signInButton.render();
      const signUpButton = new TextComponent({
        type: 'button',
        tag: 'a',
        class: 'button',
        href: 'signUp',
        text: 'Sign up',
        section: 'signUp',
      });
      buttonColumn.innerHTML += signUpButton.render();
    }
    if (this._authorized) {
      const infoBar = new InfoBar(topSection);
      infoBar.render();

    }
    head.innerHTML += chip.render();
    head.innerHTML += text.render();
    console.log('asd');
    this._parent.appendChild(head);
    head.addEventListener('click', (evt)=> {
      const {target} = evt;
      console.log(evt);
      if (target.id === 'logout') {
        console.log(target);
        AjaxModule.logOut(application);
      }
    });
  }
}