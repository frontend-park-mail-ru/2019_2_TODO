import OfflineGameView from '../OfflineGame/OfflineGameView';
import MultiPlayer from '../../module/Multiplayer/MultiPlayer';


export default class MultiPlayerView extends OfflineGameView {
  constructor(element) {
    super(element);
    this.el.id = 'multiplayer';
    this.game = new MultiPlayer();
  }
  addHandlers() {
    document.getElementById('startGame').addEventListener('click', (event)=>{
      this.game.ready();
    });
  }
}
