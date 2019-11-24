import {HeaderComponent} from '../../components/Header/Header.js';
import BaseView from '../BaseView/BaseView.js';
import {MenuBar} from '../../components/MenuBar/MenuBar';

/** Стартовый экран*/
export default class StartScreen extends BaseView {
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
    const header = new HeaderComponent(
        application,
        user.isAuth,
        user.avatar,
        user.username
    );
    header.render();
    const menuBar = new MenuBar(application);
    menuBar.render();
    if (user.isAuth) {
      header.addListener('logout');
    }
  }
}
