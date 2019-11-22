import OfflineGameView from '../OfflineGame/OfflineGameView';
import MultiPlayer from '../../module/Multiplayer/MultiPlayer';


export default class MultiPlayerView extends OfflineGameView {
  constructor(element) {
    super(element);
    this.el.id = 'multiplayer';
    this.game = new MultiPlayer();
  }
  addHandlers() {
    document.getElementById('gameOut').addEventListener('click', (event)=>{
        this.game.quitGame();
    });
    const stG = document.getElementById('startGame');
    stG.addEventListener('click', (event)=>{
      stG.hidden = true;
      this.game.ready();
    });
    document.getElementById('firstButton').addEventListener('click', (evt) => {
      OfflineGameView.disableButtonPanel('playerPanel');
      this.game[document.getElementById('firstButton').innerText]();
    });
    document.getElementById('secondButton').addEventListener('click', (evt) => {
      OfflineGameView.disableButtonPanel('playerPanel');
      this.game.fold();
    });
    document.getElementById('raiseSlider').addEventListener('mousemove', (evt)=>{
      document.getElementById('thirdButton').textContent = `raise: ${evt.target.value}`;
    });
    document.getElementById('thirdButton').addEventListener('click', (evt)=>{
      evt.preventDefault();
      this.game.raise(document.getElementById('raiseSlider').value);
    });
  }
}
