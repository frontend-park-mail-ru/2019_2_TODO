import BaseView from '../BaseView/BaseView';
import {TableComponent} from '../../components/TableComponent/TableComponent';
import {HeaderComponent} from '../../components/Header/Header';
import MultiPlayerView from '../MultiplayerView/MultiPlayerView';
import AjaxModule from '../../module/AjaxModule/ajax';

/** View со столами */
export default class TableView extends BaseView {
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
    const tables = document.createElement('div');
    tables.id = 'tables';
    tables.className = 'tables';
    application.appendChild(tables);
    AjaxModule.fetchGet('http://93.171.139.196:782/rooms/')
        .then((res)=>{
          return res.text();
        })
        .then((resText)=>{
          const rooms = JSON.parse(resText).rooms;
          console.log(rooms);
          Object.keys(rooms).forEach((key)=>{
            TableView.addTable(key, rooms[key], '2');
          });
        });
  }

  /**
   * Добавить стол
   * @param {string} id
   * @param {string} taken
   * @param {string} places
   */
  static addTable(id, taken, places) {
    const tables = document.getElementById('tables');
    const table = new TableComponent({
      taken: taken,
      all: places,
      id: id,
    });
    const smt = document.createElement('div');

    smt.innerHTML = table.render();
    tables.appendChild(smt);
    smt.addEventListener('click', (event)=>{
      router.register(`/tables/${id}`, MultiPlayerView);
      router.open(`/tables/${id}`, id);
    });
  }
}
