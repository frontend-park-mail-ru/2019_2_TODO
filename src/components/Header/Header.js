import {ButtonComponent} from '../Button/Button.js';
import {TextComponent} from '../TextComponent/Text.js';
import {ImageComponent} from '../Image/Image.js';
import {startScreen} from '../StartScreen/StartScreen.js';
import {signUpScreen} from '../SignUpScreen/SignUpScreen.js';
import {signInScreen} from '../SignInScreen/SignInScreen.js';
import {renderProfile} from '../Profile/Profile.js';
import {InfoBar} from "../InfoBar/InfoBar.js";

const application = document.getElementById('application');

const evtListener = (evt) => {
  const functions = {
    start: startScreen,
    signUp: signUpScreen,
    signIn: signInScreen,
    profile: renderProfile,
    // about: null,
  };
  const {target} = evt;
  if ((target instanceof HTMLButtonElement) ||
      (target instanceof HTMLImageElement)) {
    evt.preventDefault();
    functions[target.dataset.section](application);
  }
};

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
   * @param {string} username - имяпользователя
   */
  render(username = null) {
    const head = document.createElement('header');
    head.id = 'header';
    const backButton = new ButtonComponent({
      text: 'Startscreen',
      class: 'backButton',
      section: 'start',
    });
    head.innerHTML += backButton.render();
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
      const signInButton = new ButtonComponent({
        href: '/SignIn',
        text: 'Sign in',
        section: 'signIn',
      });
      head.innerHTML += signInButton.render();
      const signUpButton = new ButtonComponent({

        text: 'Sign up',
        section: 'signUp',
      });
      head.innerHTML += signUpButton.render();
    }
    if (this._authorized) {
      const infoBar = new InfoBar(head ,username, 'http://93.171.139.196:780/images/');
      infoBar.render()
      // const avatar = new ImageComponent({
      //     src: "",
      //     class: "avatar"
      // });
      // const profileButton = new ButtonComponent({
      //   text: username.username,
      //   section: 'profile',
      //});
      // head.innerHTML += avatar.render();
      //head.innerHTML += profileButton.render();
    }
    head.innerHTML += chip.render();
    head.innerHTML += text.render();

    head.addEventListener('click', evtListener);
    this._parent.appendChild(head);
  }
}

// export default 1
