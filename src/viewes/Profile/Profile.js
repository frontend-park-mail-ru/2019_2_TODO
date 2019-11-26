import BaseView from '../BaseView/BaseView.js';
import {HeaderComponent} from '../../components/Header/Header';
import Profile from '../../components/ProfileComponent/ProfileComponent';

/** Профиль*/
export default class ProfileView extends BaseView {
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
    const header = new HeaderComponent(this.el);
    header.render();
    const prof = new Profile({
      avatar: user.avatar,
      nickname: user.username,
      score: 1000,
    });
    application.appendChild(prof.render());
  }
}
