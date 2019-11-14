import PokerUserPanel from '../../PokerUserPanel/PokerUserPanel.js';
import {game} from '../../../module/PokerGamePlay.js';
import {BotPanel} from '../../BotPanel/BotPanel.js';
import {ButtonComponent} from '../../Button/Button.js';
import {BankPanel} from '../../BankPanel/BankPanel.js';
import AjaxModule from '../../../module/ajax.js';
import BaseView from '../BaseView/BaseView.js';
import {PlayerInfo} from "../../PlayerInfo/PlayerInfo.js";
import {Card} from "../../Card/Card.js";
import {BankersCard} from "../../BancersCard/BancersCard";
import {PokerCSSAnimation} from "../../../module/PokerCSSAnimation";

export default class OfflineGameView extends BaseView {
  constructor(element) {
    super(element);
    this.card = null;
    this.game = null;

  }

  render() {
    this.el.innerHTML = '';
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
    const playerButton = new PokerUserPanel();
    this.el.innerHTML += playerButton.render();
    this.game = new game();
    this.game.startRound();
    const raiseButton = new ButtonComponent({
      id: 'raiseButton',
      text: 'raise',
      class: 'poker-user-panel__button__raise-button',
      options: 'hidden',
    });
    document.getElementById('thirdButton').innerHTML += raiseButton.render();
    document.getElementById('firstButton').addEventListener('click', (evt) => {
      OfflineGameView.disableButtonPanel('playerPanel');
      this.game[document.getElementById('firstButton').innerText](evt);
    });
    document.getElementById('secondButton').addEventListener('click', (evt) => {
      OfflineGameView.disableButtonPanel('playerPanel');
      this.game.fold(evt);
    });
    document.getElementById('thirdButton').addEventListener('mouseenter', (evt) => {
      evt.preventDefault();
      document.getElementById('raiseInput').hidden = false;
      document.getElementById('raiseButton').hidden = false;
      document.getElementById('raiseText').hidden = true;
    });
    document.getElementById('thirdButton').addEventListener('mouseleave', (evt) => {
      evt.preventDefault();
      document.getElementById('raiseInput').hidden = true;
      document.getElementById('raiseButton').hidden = true;
      document.getElementById('raiseText').hidden = false;
    });
    document.getElementById('raiseButton').addEventListener('click', (evt) => {
      OfflineGameView.disableButtonPanel();
      this.game.raise({target: {parentElement: {id: 'playerPanel'}}}, document.getElementById('raiseInput').value);
    });
    // const card = new Card({
    //   nominal: 'As',
    // });
    // const secondCard = new Card({
    //   nominal: '2d',
    //   second: 'card-second',
    // })
    // const ppanel = document.getElementById('user');
    // ppanel.innerHTML += card.render() + secondCard.render();
    // setTimeout(() => {
    //   const qqq = document.getElementById('bot');
    //   qqq.innerHTML += card.render() + secondCard.render();
    // }, 1000);
    // const bank = document.getElementById('bankerCardId');
    // const cardBack = new Card();
    // bank.innerHTML += cardBack.render()+cardBack.render()+cardBack.render()+cardBack.render()+cardBack.render();
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
  }

  // render() {
  //   window.username = 'username';
  //   window.avatar = '/assets/gold_fishka.jpg';
  //   AjaxModule.fetchGet('http://93.171.139.196:780/signin/')
  //       .catch(()=>{
  //         this.el.innerHTML = '';
  //         const back = document.createElement('a');
  //         back.className = 'button button-back';
  //         back.textContent = 'back';
  //         back.href = '/';
  //         const bankPanel = new BankPanel();
  //         bankPanel.updateContext({});
  //         this.el.innerHTML += bankPanel.render();
  //         this.el.appendChild(back);
  //         const botPanel = new BotPanel();
  //         botPanel.updateContext({});
  //         this.el.innerHTML += botPanel.render();
  //         const canvas = document.createElement('canvas');
  //         canvas.className = 'canvas';
  //         canvas.id = 'canvas';
  //         canvas.width = 1024;
  //         canvas.height = 768;
  //         this.el.appendChild(canvas);
  //         this.el.className = 'sect';
  //         const buttonsPanel = new PokerUserPanel();
  //         buttonsPanel.updateContext({
  //           score: window.sessionStorage.playerScore,
  //           bet: window.sessionStorage.playerBet,
  //           username: window.username,
  //           src: window.avatar,
  //         });
  //         this.el.innerHTML += buttonsPanel.render();
  //         this.game = new game();
  //         this.game.startRound();
  //         const raiseButton = new ButtonComponent({
  //           id: 'raiseButton',
  //           text: 'raise',
  //           class: 'poker-user-panel__button__raise-button',
  //           options: 'hidden',
  //         });
  //         document.getElementById('thirdButton').innerHTML += raiseButton.render();
  //         document.getElementById('firstButton').addEventListener('click', (evt) => {
  //           OfflineGameView.disableButtonPanel('playerPanel');
  //           this.game[document.getElementById('firstButton').innerText](evt);
  //         });
  //         document.getElementById('secondButton').addEventListener('click', (evt) => {
  //           OfflineGameView.disableButtonPanel('playerPanel');
  //           this.game.fold(evt);
  //         });
  //         document.getElementById('thirdButton').addEventListener('mouseenter', (evt) => {
  //           evt.preventDefault();
  //           document.getElementById('raiseInput').hidden = false;
  //           document.getElementById('raiseButton').hidden = false;
  //           document.getElementById('raiseText').hidden =true;
  //         });
  //         document.getElementById('thirdButton').addEventListener('mouseleave', (evt) => {
  //           evt.preventDefault();
  //           document.getElementById('raiseInput').hidden = true;
  //           document.getElementById('raiseButton').hidden = true;
  //           document.getElementById('raiseText').hidden = false;
  //         });
  //         document.getElementById('raiseButton').addEventListener('click', (evt) => {
  //           OfflineGameView.disableButtonPanel();
  //           this.game.raise({target: {parentElement: {id: 'playerPanel'}}}, document.getElementById('raiseInput').value);
  //         });
  //       })
  //       .then((res) => res.text())
  //       .then((resText) => {
  //         if (resText) {
  //           window.username = JSON.parse(resText).username;
  //           window.avatar = JSON.parse(resText).image;
  //         }
  //         this.el.innerHTML = '';
  //         const back = document.createElement('a');
  //         back.className = 'button button-back';
  //         back.textContent = 'back';
  //         back.href = '/';
  //         const bankPanel = new BankPanel();
  //         bankPanel.updateContext({});
  //         this.el.innerHTML += bankPanel.render();
  //         this.el.appendChild(back);
  //         const botPanel = new BotPanel();
  //         botPanel.updateContext({});
  //         this.el.innerHTML += botPanel.render();
  //         const canvas = document.createElement('canvas');
  //         canvas.className = 'canvas';
  //         canvas.id = 'canvas';
  //         canvas.width = 1024;
  //         canvas.height = 768;
  //         this.el.appendChild(canvas);
  //         this.el.className = 'sect';
  //         const buttonsPanel = new PokerUserPanel();
  //         buttonsPanel.updateContext({
  //           score: window.sessionStorage.playerScore,
  //           bet: window.sessionStorage.playerBet,
  //           username: window.username,
  //           src: window.avatar,
  //         });
  //         this.el.innerHTML += buttonsPanel.render();
  //         this.game = new game();
  //         this.game.startRound();
  //         const raiseButton = new ButtonComponent({
  //           id: 'raiseButton',
  //           text: 'raise',
  //           class: 'poker-user-panel__button__raise-button',
  //           options: 'hidden',
  //         });
  //         document.getElementById('thirdButton').innerHTML += raiseButton.render();
  //         document.getElementById('firstButton').addEventListener('click', (evt) => {
  //           OfflineGameView.disableButtonPanel('playerPanel');
  //           this.game[document.getElementById('firstButton').innerText](evt);
  //         });
  //         document.getElementById('secondButton').addEventListener('click', (evt) => {
  //           OfflineGameView.disableButtonPanel('playerPanel');
  //           this.game.fold(evt);
  //         });
  //         document.getElementById('thirdButton').addEventListener('mouseenter', (evt) => {
  //           evt.preventDefault();
  //           document.getElementById('raiseInput').hidden = false;
  //           document.getElementById('raiseButton').hidden = false;
  //           document.getElementById('raiseText').hidden =true;
  //         });
  //         document.getElementById('thirdButton').addEventListener('mouseleave', (evt) => {
  //           evt.preventDefault();
  //           document.getElementById('raiseInput').hidden = true;
  //           document.getElementById('raiseButton').hidden = true;
  //           document.getElementById('raiseText').hidden = false;
  //         });
  //         document.getElementById('raiseButton').addEventListener('click', (evt) => {
  //           OfflineGameView.disableButtonPanel();
  //           this.game.raise({target: {parentElement: {id: 'playerPanel'}}}, document.getElementById('raiseInput').value);
  //         });
  //       });
  // }
}
