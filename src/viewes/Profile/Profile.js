import BaseView from '../BaseView/BaseView.js';
import {HeaderComponent} from '../../components/Header/Header';
import {ProfileComponent} from '../../components/ProfileComponent/ProfileComponent';


export default class ProfileView extends BaseView {
  constructor(element) {
    super(element);
  }

  render() {
    this.el.innerHTML = '';
    const application = this.el;
    const header = new HeaderComponent(this.el);
    header.render();
    const prof = new ProfileComponent({
      avatar: user.avatar,
      nickname: user.username,
      score: 1000,
    });
    application.innerHTML = prof.render();
  }
}