import BaseComponent from '../../BaseComponent/BaseComponent.js';
import BaseView from '../BaseView/BaseView.js';
import AjaxModule from '../../../module/ajax.js';
import template from './Profile.hbs';
import {HeaderComponent} from "../../Header/Header";

/** Класс профиля */
export class ProfileComponent extends BaseComponent {
  /**
     * Создать профиль
     * @param {string} context - контекст для профиля
     */
  constructor(context) {
    super();
    this.context = context;
    this.template = template;
  }
}


export default class ProfileView extends BaseView {
  constructor(element) {
    super(element);
  }

  render() {
    this.el.innerHTML = '';
    const application = this.el;
    AjaxModule.fetchGet('http://93.171.139.196:780/signin/')
        .catch(() => {
          window.avatar = 'https://jok.io/Images/Shared/unknown_female.png';
          window.username = 'unauthorized';
          const prof = new ProfileComponent({
            avatar: window.avatar,
            nickname: window.username,
            score: 1000,
          });
          application.innerHTML = prof.render();
        })
        .then((res) => {x
          return res.text();
        })
        .then((resT) => {
          const header = new HeaderComponent(this.el);
          header.render();
          window.avatar = JSON.parse(resT).image;
          window.username = JSON.parse(resT).username;
          const prof = new ProfileComponent({
            avatar: window.avatar,
            nickname: window.username,
            score: 1000,
          });
          application.innerHTML = prof.render();
        });
  }
}
