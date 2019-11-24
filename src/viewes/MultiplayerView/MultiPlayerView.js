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
      MultiPlayerView.disableButtonPanel('playerPanel');
      this.game[document.getElementById('firstButton').innerText]();
    });
    document.getElementById('secondButton').addEventListener('click', (evt) => {
      MultiPlayerView.disableButtonPanel('playerPanel');
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
  static disableButtonPanel() {
    // document.getElementById('user').parentElement.style.border = 'none';
    // document.getElementById('bot').parentElement.style.border = '2px solid gold';
    const element = document.getElementById('playerPanel');
    element.childNodes.forEach((child) => {
      child.disabled = true;
    });
  }
  static enableButtonPanel(text = 'check', score = 1000) {

    const element = document.getElementById('playerPanel');
    element.childNodes.forEach((child) => {
      child.disabled = false;
    });
    document.getElementById('firstButton').textContent = text;
    document.getElementById('raiseSlider').max = ;
    document.getElementById('raiseSlider').value = 20;
  }
}
