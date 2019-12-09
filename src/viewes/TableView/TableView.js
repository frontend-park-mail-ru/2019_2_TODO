import BaseView from '../BaseView/BaseView';
import {TableComponent} from '../../components/TableComponent/TableComponent';
import {HeaderComponent} from '../../components/Header/Header';
import MultiPlayerView from "../MultiplayerView/MultiPlayerView";
import AjaxModule from '../../module/AjaxModule/ajax';


export default class TableView extends BaseView {
  constructor(element) {
    super(element);
  }

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
    AjaxModule.fetchGet('/auth/rooms/')
        .then((res)=>{
          return res.text();
        })
        .then((resText)=>{
          const rooms = JSON.parse(resText).rooms;
          //console.log(rooms);
          Object.keys(rooms).forEach((key)=>{
            TableView.addTable(key, rooms[key], '2');
          });
        });
  }
  static addTable(id, taken, places){
    const tables = document.getElementById('tables');
    const table = new TableComponent({
      taken: taken,
      all: places,
      id: id,
    });
    const smt = document.createElement('div');

    smt.appendChild(table.render());
    tables.appendChild(smt);
    smt.addEventListener('click', (event)=>{
      router.open(`/multiplayer?room=${id}`);
    }, {once: true});
  }
}
