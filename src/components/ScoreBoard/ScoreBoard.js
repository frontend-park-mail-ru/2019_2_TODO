import template from './ScoreBoard.hbs';
import BaseComponent from '../BaseComponent/BaseComponent';
import AjaxModule from '../../module/AjaxModule/ajax';
import LeaderInfo from '../LeaderInfo/LeaderInfo';

/** Скорборд*/
export default class ScoreBoard extends BaseComponent {
  /**
   * Создать
   * @param {Object} context
   */
  constructor(context) {
    super(context);
    this.template = template;
    this.parent = parent;
  }

  /**
   * Отрисовать
   * @return {HTMLElement}
   */
  render() {
    this.compile();
    AjaxModule.fetchGet('https://pokertodo.online:743/leaderboard/')
        .then((res)=>{
          return res.text();
        })
        .then((resText)=>{
          const {leaders} = JSON.parse(resText);
          leaders.forEach((leader, index)=>{
            const user = new LeaderInfo({
              score: leader.points,
              id: leader.id,
              nickname: leader.username,
              position: index + 1,
            });
            this.element.children[1].appendChild(user.render());
          });
        });
    return this.element;
  }
}
