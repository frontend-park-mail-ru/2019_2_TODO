import PokerUserPanel from '../../PokerUserPanel/PokerUserPanel.js';
import {game} from '../../../module/PokerGamePlay.js';
import {BotPanel} from '../../BotPanel/BotPanel.js';
import {ButtonComponent} from '../../Button/Button.js';
import {BankPanel} from '../../BankPanel/BankPanel.js';
import AjaxModule from '../../../module/ajax.js';
import BaseView from '../BaseView/BaseView.js';
import {PlayerInfo} from "../../PlayerInfo/PlayerInfo.js";
// import {Card} from "../../Card/Card.js";
import {BankersCard} from "../../BancersCard/BancersCard";
import {TextComponent} from "../../TextComponent/Text";
import {InputComponent} from "../../Input/Input";
// import {PokerCSSAnimation} from "../../../module/PokerCSSAnimation";

export default class OfflineGameView extends BaseView {
  constructor(element) {
    super(element);
    this.card = null;
    this.game = null;

  }

  render() {
    this.el.innerHTML = '';
    const backButton = new TextComponent({
      tag: 'a',
      text: 'back',
      class: 'back',
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
    const playerInfo = new PlayerInfo({
      username: 'user',
      score: '1000',
      id: 'user',
      playerScoreId: 'userScore',
    });
    this.el.innerHTML += playerInfo.render();
    const botInfo = new PlayerInfo({
      username: 'bot',
      score: '1000',
      id: 'bot',
      playerScoreId: 'botScore',
    });
    this.el.innerHTML += botInfo.render();
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
      this.game = new game();
      this.game.startRound();
      document.getElementById('startGame').hidden = true;
    }, {once: true});
  }


  static disableButtonPanel() {
    const element = document.getElementById('playerPanel');
    element.childNodes.forEach((child) => {
      child.disabled = true;
    });
  }

  static enableButtonPanel(text = 'check') {
    const element = document.getElementById('playerPanel');
    element.childNodes.forEach((child) => {
      child.disabled = false;
    });
    document.getElementById('firstButton').textContent = text;
    document.getElementById('raiseSlider').max = sessionStorage.playerScore;
    document.getElementById('raiseSlider').value = 20;
  }
}
