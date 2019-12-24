import BaseComponent from '../BaseComponent/BaseComponent';
import template from './TableComponent.hbs';
import {RoomPlayerInfo} from '../RoomPlayerInfo/RoomPlayerInfo';

export class TableComponent extends BaseComponent {
  constructor(context, users) {
    super(context);
    this.template = template;
    this.users = users;
  }

  render() {
    this.compile();
    this.users.forEach((player)=>{
      const playerInfo = new RoomPlayerInfo({
        avatar: player.avatar,
        nickname: player.username,
      });
      this.element.children[1].appendChild(playerInfo.render());
    });
    for (let i = 0; i < this.context.all - this.users.length; i++) {
      const playerInfo = new RoomPlayerInfo({
        avatar: '/assets/plus.png',
        nickname: 'Empty',
      });
      this.element.children[1].appendChild(playerInfo.render());
    }
    return this.element;
  }
}

// export class Table {
//   constructor(
//     places,
//     parent,
//     tablesId,
//   ) {
//     this._parent = parent;
//     this._places = places;
//     this._tablesId = tablesId;
//   }
//
//   render() {
//     const table = new TableComponent({
//       roomBet: 500,
//       id: this._tablesId,
//     });
//     const tables = document.getElementById('tables');
//     tables.appendChild(table.render());
//     const t = document.getElementById(this._tablesId);
//
//   }
// }
