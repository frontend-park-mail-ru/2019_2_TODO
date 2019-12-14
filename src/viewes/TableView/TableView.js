import BaseView from '../BaseView/BaseView';
import {TableComponent} from '../../components/TableComponent/TableComponent';
import {HeaderComponent} from '../../components/Header/Header';
import RoomController from "../../module/RoomController/RoomController";

/** Столы*/
export default class TableView extends BaseView {
  /**
   * Создать
   * @param {HTMLElement} element
   */
  constructor(element) {
    super(element);
    this.roomsController = new RoomController();
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
    this.roomsController.rooms.forEach((room) => {
      if (room) {
        TableView.addTable(room.id, room.taken, room.places);
      }
    });
    addEventListener('updateRooms', (event)=>{
      event.preventDefault();
      tables.innerHTML = '';
      const rooms = this.roomsController.rooms;
      Object.keys(rooms).forEach((key) => {
        TableView.addTable(key, rooms[key], '2');
      });
    });
  }

  /**
   * Доваить стол
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

    smt.appendChild(table.render());
    tables.appendChild(smt);
    smt.addEventListener('click', (event)=>{
      router.open(`/multiplayer?room=${id}`);
    }, {once: true});
  }
}
