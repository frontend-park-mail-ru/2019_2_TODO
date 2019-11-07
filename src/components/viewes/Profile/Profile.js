import BaseComponent from '../../BaseComponent/BaseComponent.js';
import BaseView from '../BaseView/BaseView.js';
import AjaxModule from '../../../module/ajax.js';


/** Класс профиля */
export class ProfileComponent extends BaseComponent {
  /**
     * Создать профиль
     * @param {string} context - контекст для профиля
     */
  constructor(context) {
    super();
    this.context = context;
    this.template = Handlebars.compile(`
        <form class="profileForm">
            <a class="button profileForm__button" id="closeButton" href="/">Close</a>
            <img class="profileForm__avatar" src="{{avatar}}" alt="">
            <a class="profileForm__text">{{nickname}}</a>
            <a class="profileForm__text">{{score}}</a>
            <a class="button profileForm__button", href="/profileChange">Change</a> 
        </form>
        `);
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
          window.avatar = '/assets/gold_fishka.jpg';
          window.username = 'unauthorized';
          const prof = new ProfileComponent({
            avatar: window.avatar,
            nickname: window.username,
            score: 1000,
          });
          application.innerHTML = prof.render();
        })
        .then((res) => {
          return res.text();
        })
        .then((resT) => {
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
