
/** Управление комнатами*/
export default class RoomController {
  /** Создать*/
  constructor() {
    this.rooms = [];
    this.socket = null;
  }
  startSession() {
    new Promise((resolve, reject) => {
      const socket = new WebSocket('wss://pokertodo.online:743/rooms');
      socket.onopen = () => {
        resolve(socket);
      };
      socket.onmessage = (msg) => {
        const {rooms} = JSON.parse(msg.data);
        this.updateRooms(rooms);
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
  updateRooms(room) {
    this.rooms = room;
    dispatchEvent(new Event('updateRooms'));
  }
}
