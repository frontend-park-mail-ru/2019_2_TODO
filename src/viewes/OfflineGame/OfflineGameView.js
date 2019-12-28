import PokerUserPanel from '../../components/PokerUserPanel/PokerUserPanel.js';
import {Game} from '../../module/GamePlay/PokerGamePlay.js';
import {ButtonComponent} from '../../components/Button/Button.js';
import {BankPanel} from '../../components/BankPanel/BankPanel.js';
import BaseView from '../BaseView/BaseView.js';
import {PlayerInfo} from '../../components/PlayerInfo/PlayerInfo.js';
import {BankersCard} from '../../components/BancersCard/BancersCard';
import {TextComponent} from '../../components/TextComponent/Text';
import ScoreSpan from '../../components/ScoreSpan/ScoreSpan';
import NewRound from '../../components/NewRound/NewRound';


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
    window.playerGrid = [true, true, true, true, true];
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
    this.el.appendChild(backButton.render());
    const startButton = new ButtonComponent({
      text: 'start',
      class: 'button startGameButton',
      id: 'startGame',
    });

    this.el.appendChild(startButton.render());
    this.el.className = 'sect';
    const table = document.createElement('div');
    table.className = 'table';
    const bankerCard = new BankersCard();
    const bankSpan = new BankPanel({bank: '1000'});
    table.appendChild(bankSpan.render());
    table.appendChild(bankerCard.render());
    const newRound = new NewRound();
    this.el.appendChild(newRound.render());
    this.el.appendChild(table);
    for (let i = 0; i < 5; i++) {
      const bet = new ScoreSpan({
        value: '',
        id: 'scoreSpan' + i,
      });
      table.appendChild(bet.render());
    }
    const playersContainer = document.createElement('div');
    playersContainer.id = this.el.id + '__players';
    playersContainer.className = 'playerContainer';
    this.el.appendChild(playersContainer);
    const playerButton = new PokerUserPanel();
    this.el.appendChild(playerButton.render());
    this.el.requestFullscreen();
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
    document.getElementById('raiseSlider').addEventListener('mousemove', (evt) => {
      document.getElementById('thirdButton').textContent = `raise: ${evt.target.value}`;
    });
    document.getElementById('raiseSlider').addEventListener('change', (evt) => {
      document.getElementById('thirdButton').textContent = `raise: ${evt.target.value}`;
    });
    document.getElementById('thirdButton').addEventListener('click', (evt) => {
      this.game.raise(evt, document.getElementById('raiseSlider').value);
    });
    document.getElementById('startGame').addEventListener('click', (evt) => {
      OfflineGameView.addPlayer('user', user.username, '1000', 'singleplayer__players');
      OfflineGameView.addPlayer('bot', 'bot', '1000', 'singleplayer__players');
      this.game = new Game();
      setTimeout(() => {
        this.game.startRound();
      }, 1000);
      document.getElementById('startGame').hidden = true;
    }, {once: true});
  }

  static addPlayer(playerId, username, score, containerId) {
    const playerInfo = new PlayerInfo({
      username: username,
      score: `${score}/0`,
      id: playerId,
      containerId: `${playerId}container`,
      playerScoreId: `${playerId}Score`,
    });
    let i = 0;
    while (!playerGrid[i]) {
      i++;
    }
    playerGrid[i] = false;
    console.log('grid-area: plG'+i+';');
    playerInfo.render().style = 'grid-area: plG'+i+';';
    playerInfo.render().dataset['area'] = ''+i;
    // if (i === 1 || i=== 4) {
    //   playerInfo.render().style.transform = 'translate(0,-20px);';
    // }
    document.getElementById(containerId).appendChild(playerInfo.render());
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
    document.getElementById('user').parentElement.style.border =
        '2px solid gold';
    const element = document.getElementById('playerPanel');
    element.childNodes.forEach((child) => {
      child.disabled = false;
    });
    document.getElementById('firstButton').textContent = text;
    document.getElementById('raiseSlider').max = Math.min(
        parseInt(sessionStorage.playerScore),
        parseInt(sessionStorage.botScore) + parseInt(sessionStorage.playerBet)
    );
    document.getElementById('raiseSlider').min = Math.max(20, parseInt(sessionStorage.botBet) - parseInt(sessionStorage.playerBet) + 20);
    document.getElementById('raiseSlider').value = document.getElementById('raiseSlider').min;
    document.getElementById('thirdButton').innerText = `raise: ${parseInt(document.getElementById('raiseSlider').value)}`;
  }
}
