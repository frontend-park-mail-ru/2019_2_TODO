import MultiPlayerView from '../../viewes/MultiplayerView/MultiPlayerView';

/** Управление комнатами*/
export default class RoomController {
  /** Создать*/
  constructor() {
    this.rooms = [];
    this.socket = null;
  }
  startSession() {
    new Promise((resolve, reject) => {
      const socket = new WebSocket('/rooms_controller');
      socket.onopen = () => {
        resolve(socket);
      };
      socket.onmessage = (msg) => {
        const {Command} = JSON.parse(msg.data);
        Object.keys(Command).forEach((key) => {
          this[key](Command[key]);
        });
      };
      socket.onerror = (err) => {
        reject(err);
      };
    }).then((socket) => {
      this.socket = socket;
    }).catch((err)=>{
      console.log(err);
    });
  }

  /**
   * Добавить коинату
   * @param {Object} room
   */
  addRoom(room) {
    this.rooms.push(room);
    router.register('/rooms/'+room.id, MultiPlayerView);
    dispatchEvent(new Event('addRoom'));
  }

  /**
   * Удалить комнату
   * @param {Object} room
   */
  removeRoom(room) {
    this.rooms[this.rooms.indexOf(room)] = null;
    router.remove('/rooms/'+room.id);
    dispatchEvent(new Event('removeRoom'));
  }
}
