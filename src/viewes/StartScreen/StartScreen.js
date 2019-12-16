import {HeaderComponent} from '../../components/Header/Header.js';
import BaseView from '../BaseView/BaseView.js';
import {MenuBar} from '../../components/MenuBar/MenuBar';
import ScoreBoard from '../../components/ScoreBoard/ScoreBoard';

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
        user.username,
    );
    header.render();
    const div = document.createElement('div');
    div.className = 'body';
    const menuBar = new MenuBar({});
    const scoreBoard = new ScoreBoard({});
    div.appendChild(menuBar.render());
    div.appendChild(scoreBoard.render());
    application.appendChild(div);
  }
}
