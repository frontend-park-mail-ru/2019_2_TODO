import BaseView from '../BaseView/BaseView';
import {
  Table,
  TableComponent,
} from '../../components/TableComponent/TableComponent';
import {HeaderComponent} from '../../components/Header/Header';
import MultiPlayerView from "../MultiplayerView/MultiPlayerView";
import AjaxModule from '../../module/AjaxModule/ajax';
import {RoomPlayerInfo} from '../../components/RoomPlayerInfo/RoomPlayerInfo';
import {
  OnlineComponent,
  OnlineTable,
} from '../../components/OnlineComponent/OnlineComponent';


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
    // const tables = document.createElement('div');
    // tables.id = 'tables';
    // tables.className = 'tables';
    const tables = new OnlineTable(application);
    tables.render();
    // application.appendChild(tables.render());
    const table = new Table(2, tables, 'table1');
    const table2 = new Table(5, tables, 'table2');
    const table3 = new Table(5, tables, 'table3');
    const table4 = new Table(5, tables, 'table4');
    const table5 = new Table(5, tables, 'table5');
    table.render();
    table3.render();
    table2.render();
    table4.render();
    table5.render();
    AjaxModule.fetchGet('/auth/rooms/')
    //     .then((res)=>{
    //       return res.text();
    //     })
    //     .then((resText)=>{
    //       const rooms = JSON.parse(resText).rooms;
    //       //console.log(rooms);
    //       Object.keys(rooms).forEach((key)=>{
    //         TableView.addTable(key, rooms[key], '2');
    //       });
    //     });
  }
  // static addTable(id, taken, places){
  //   const tables = document.getElementById('tables');
  //   const table = new TableComponent({
  //     taken: taken,
  //     all: places,
  //     id: id,
  //   });
  //   const smt = document.createElement('div');
  //
  //   smt.appendChild(table.render());
  //   tables.appendChild(smt);
  //   smt.addEventListener('click', (event)=>{
  //     router.register(`/tables/${id}`, MultiPlayerView);
  //     router.open(`/tables/${id}`, id);
  //   });
  // }
}
