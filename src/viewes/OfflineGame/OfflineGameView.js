import PokerUserPanel from '../../components/PokerUserPanel/PokerUserPanel.js';
import {Game} from '../../module/GamePlay/PokerGamePlay.js';
import {ButtonComponent} from '../../components/Button/Button.js';
import {BankPanel} from '../../components/BankPanel/BankPanel.js';
import BaseView from '../BaseView/BaseView.js';
import {PlayerInfo} from '../../components/PlayerInfo/PlayerInfo.js';
import {BankersCard} from '../../components/BancersCard/BancersCard';
import {TextComponent} from '../../components/TextComponent/Text';
import {InputComponent} from '../../components/Input/Input';

/** Игра оффлайн*/
export default class OfflineGameView extends BaseView {
  /**
   * Создать
   * @param {HTMLElement} element
   */
  constructor(element) {
    super(element);
    this.el.id = 'singleplayer';
    this.card = null;
    this.game = null;
  }
  /** Отрисовать*/
  render() {
    this.el.innerHTML = '';
    const backButton = new TextComponent({
      tag: 'a',
      text: 'back',
      class: 'back',
      id: 'gameOut',
      href: '/',
    });
    this.el.innerHTML += backButton.render();
    const startButton = new ButtonComponent({
      text: 'start',
      class: 'button startGameButton',
      id: 'startGame',
    });
    this.el.innerHTML += startButton.render();
    this.el.className = 'sect';
    const table = document.createElement('div');
    table.className = 'table';
    const bankerCard = new BankersCard();
    const bankSpan = new BankPanel({bank: '1000'});
    table.innerHTML += bankSpan.render();
    table.innerHTML += bankerCard.render();
    this.el.appendChild(table);
    const playersContainer = document.createElement('div');
    playersContainer.id = this.el.id + '__players';
    this.el.appendChild(playersContainer);

    const raiseSlider = new InputComponent({
      type: 'range',
      id: 'raiseSlider',
      class: 'raise-slider',
      min: '20',
      max: '1000',
      text: '20',
    });
    this.el.innerHTML += raiseSlider.render();
    const playerButton = new PokerUserPanel();
    this.el.innerHTML += playerButton.render();
    this.addHandlers();
  }
  /** Добавить обработчики*/
  addHandlers() {
    document.getElementById('firstButton').addEventListener('click', (evt) => {
      OfflineGameView.disableButtonPanel('playerPanel');
      this.game[document.getElementById('firstButton').innerText](evt);
    });
    document.getElementById('secondButton').addEventListener('click', (evt) => {
      OfflineGameView.disableButtonPanel('playerPanel');
      this.game.fold(evt);
    });
    document.getElementById('raiseSlider').addEventListener('mousemove', (evt)=>{
      document.getElementById('thirdButton').textContent = `raise: ${evt.target.value}`;
    });
    document.getElementById('thirdButton').addEventListener('click', (evt)=>{
      this.game.raise(evt, document.getElementById('raiseSlider').value);
    });
    document.getElementById('startGame').addEventListener('click', (evt)=>{
      OfflineGameView.addPlayer('user', user.username, '1000', 'singleplayer__players');
      OfflineGameView.addPlayer('bot', 'bot', '1000', 'singleplayer__players');
      this.game = new Game();
      setTimeout(()=>{
        this.game.startRound();
      }, 1000);
      document.getElementById('startGame').hidden = true;
    }, {once: true});
  }

  static addPlayer(playerId, username, score, containerId) {
    const playerInfo = new PlayerInfo({
      username: username,
      score: score+'/0',
      id: playerId,
      containerId: playerId+'container',
      playerScoreId: playerId+'Score',
    });
    document.getElementById(containerId).innerHTML += playerInfo.render();
  }
  static disableButtonPanel() {
    document.getElementById('user').parentElement.style.border = 'none';
    document.getElementById('bot').parentElement.style.border = '2px solid gold';
    const element = document.getElementById('playerPanel');
    element.childNodes.forEach((child) => {
      child.disabled = true;
    });
  }

  static enableButtonPanel(text = 'check') {
    document.getElementById('bot').parentElement.style.border = 'none';
    document.getElementById('user').parentElement.style.border = '2px solid gold';
    const element = document.getElementById('playerPanel');
    element.childNodes.forEach((child) => {
      child.disabled = false;
    });
    document.getElementById('firstButton').textContent = text;
    document.getElementById('raiseSlider').max = sessionStorage.playerScore;
    document.getElementById('raiseSlider').value = 20;
  }
}
