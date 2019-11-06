import BaseView from '../BaseView/BaseView.js';import PokerUserPanel from '../../PokerUserPanel/PokerUserPanel.js';import {game} from '../../../module/PokerGamePlay.js';import {BankPanel} from '../../BankPanel/BankPanel.js';import {BotPanel} from '../../BotPanel/BotPanel.js';export default class OfflineGameView extends BaseView {  constructor(element) {    super(element);    this.card = null;    this.game = null;  }  static disableButtonPanel(id) {    const element = document.getElementById(id);    element.childNodes.forEach(child => {      // child.className = 'poker-user-panel__button_disabled';      child.disabled = true;    });  }  static enableButtonPanel(id) {    const element = document.getElementById(id);    element.childNodes.forEach(child => {      // child.className = 'poker-user-panel__button';      child.disabled = false;    });  }  render() {    this.el.innerHTML = '';    const back = document.createElement('a');    back.className = 'button button-back';    back.textContent = 'back';    back.href = '/';    this.el.appendChild(back);    const bankPanel = new BankPanel();    bankPanel.updateContext({});    this.el.innerHTML += bankPanel.render();    const botPanel = new BotPanel();    botPanel.updateContext({});    this.el.innerHTML += botPanel.render();    const canvas = document.createElement('canvas');    canvas.className = 'canvas';    canvas.id = 'canvas';    canvas.width = 1024;    canvas.height = 768;    // const userPanel = new BankPanel();    // this.el.innerHTML += userPanel.render();    this.el.appendChild(canvas);    this.el.className = 'sect';    const buttonsPanel = new PokerUserPanel();    buttonsPanel.updateContext({      score: window.sessionStorage.playerScore,      bet: window.sessionStorage.playerBet    });    this.el.innerHTML += buttonsPanel.render();    this.game = new game();    this.game.startRound();    document.getElementById('firstButton').addEventListener('click', evt => {      OfflineGameView.disableButtonPanel('playerPanel');      this.game.call(evt);    });    document.getElementById('secondButton').addEventListener('click', evt => {      OfflineGameView.disableButtonPanel('playerPanel');      this.game.check(evt);    });    document.getElementById('thirdButton').addEventListener('click', evt => {      OfflineGameView.disableButtonPanel('playerPanel');      this.game.fold(evt);    });    document.getElementById('fourthButton').addEventListener('mouseenter', (evt) => {      evt.preventDefault();      const parent = document.getElementById('fourthButton');      parent.textContent = null;      const input = document.createElement('input');      const button = document.createElement('button');      input.className = 'poker-user-panel__button__input';      input.type = 'text';      input.value = '40';      button.className = 'poker-user-panel__button__raise-button';      button.textContent = 'raise';      parent.appendChild(input);      parent.appendChild(button);      button.addEventListener('click', (event) => {        event.preventDefault();        this.game.raise(evt, input.value);        OfflineGameView.disableButtonPanel('playerPanel');      })    });    document.getElementById('fourthButton').addEventListener('mouseleave', (evt) => {      evt.preventDefault();      const parent = document.getElementById('fourthButton');      parent.removeChild(parent.lastChild);      parent.removeChild(parent.lastChild);      parent.textContent = 'Raise';    });  }}// }// let counter = 100;