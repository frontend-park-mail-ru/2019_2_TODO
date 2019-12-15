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
    AjaxModule.fetchGet('/socreboard')
        .then((res)=>{
          return res.text();
        })
        .then((resText)=>{
          const {leaders} = JSON.parse(resText);
          leaders.forEach((leader)=>{
            const user = new LeaderInfo({
              score: leader.score,
              id: leader.id,
              nickname: leader.username,
              position: leader.position,
            });
            this.element.children[1].appendChild(user.render());
          });
        });
    return this.element;
  }
}
