
/** Управление комнатами*/
export default class RoomController {
  /** Создать*/
  constructor() {
    this.rooms = [];
    this.socket = null;
    this.socket = new WebSocket('wss://pokertodo.ru:743/auth/rooms/');
    this.socket.onopen = (msg) => {
      console.log(msg);
    };
    this.socket.onmessage = (msg) => {
      if (window.location.pathname !== '/tables') {
        this.socket.close();
        return;
      }
      const {rooms} = JSON.parse(msg.data);
      console.log(rooms);
      log.rooms.
      this.updateRooms(rooms);
    };
    this.socket.onerror = (err) => {
      console.log(err);
    };
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
