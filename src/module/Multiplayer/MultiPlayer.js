import {PokerCSSAnimation} from '../Animation/PokerCSSAnimation';
import MultiPlayerView from '../../viewes/MultiplayerView/MultiPlayerView';

/** Общение по вебсокету с бекэндом*/
export default class MultiPlayer {
  /**
   *  конструктор
   * @param {string} viewId
   */
  constructor(viewId) {
    this.players = [];
    this.viewId = viewId;
    const url = new URL(window.location.href);
    this.socket = new WebSocket(`wss://pokertodo.ru/online/?name=${user.username}&roomName=${url.searchParams.get('room')}&id=${user.id}`);
    this.socket.onopen = (msg)=>{
      console.log(msg);
    };
    this.socket.onmessage = (msg)=>{
      const {Command} = JSON.parse(msg.data);
      Object.keys(Command).forEach((key)=>{
        this[key](Command[key]);
      });
    };
    this.socket.onerror = (err)=> {
      console.log(err);
    };
    this.animation = new PokerCSSAnimation(this.players);
  }

  /**
   * добавить игрока
   * @param {Object} playerInfo
   */
  addPlayer(playerInfo) {
    MultiPlayerView.addPlayer(
        playerInfo.id,
        playerInfo.username,
        playerInfo.score,
        this.viewId + '__players');
    this.players.push(playerInfo.id);
  }
  /**
   * убрать игрока
   * @param {Object} playerInfo
   */
  removePlayer(playerInfo) {
    this.players.splice(
        this.players.findIndex((value) => value.id === playerInfo.id),
        1,
    );
    document.getElementById(playerInfo.id+'container').remove();

  }
  /**
   * Показать победные карты
   * @param {Object} info
   */
  showWinnerCards(info) {
    this.players.forEach((id) => {
      this.animation.removeShine(id);
    });
    const hand = HandSolve(info.hand);
    this.animation.showWinnerCards(this.getWinnersCardsId([hand]));
    setTimeout(()=>{
      this.animation.removeAllCards();
      this.ready();
    }, 3000);
  }
  /**
   * Найти победные карты
   * @param {Array} hands
   * @return {Array}
   */
  getWinnersCardsId(hands) {
    let cards = [];
    hands.forEach((hand) =>{
      const handCards = [];
      hand.cards.forEach((card)=>{
        handCards.push(card.value + card.suit);
      });
      cards = [...cards, ...handCards];
    });
    return cards;
  }
  /**
   * выйти из игры
   */
  quitGame() {
    this.socket.close();
  }
  /**
   * Начало игры
   * @param {Object} playerInfo
   */
  startGame(playerInfo) {
    this.animation.startRoundAnimation(this.players);
    this.showPlayerCards(playerInfo);
    this.updatePlayerScore(playerInfo);
  }
  /**
   * Показать карты
   * @param {Object} playerInfo
   */
  showPlayerCards(playerInfo) {
    this.animation.showPlayerCards(playerInfo.id, playerInfo.hand);
  }
  /**
   * Обновить счет
   * @param {Object} playerInfo
   */
  updatePlayerScore(playerInfo) {
    document.getElementById(playerInfo.id+'Score')
        .innerText = `${playerInfo.score}`;
    document.getElementById('ScoreSpan'+this.players.indexOf(playerInfo.id)).innerText = `${playerInfo.bet||0}`;
  }
  /**
   * Готовность
   * @param {Object} playerInfo
   */
  ready() {
    this.socket.send('ready');
  }
  /**
   * Указать информацию о текущем игроке
   * @param {Object} playerInfo
   */
  setCurrentPlayer(playerInfo) {

  }

  /**
   * Закончить игру по fold
   */
  endFoldGame() {
    setTimeout(() => {
      this.animation.removeAllCards();
    }, 1000);
    setTimeout(() => {
      this.ready();
    }, 2000);
  }
  /**
   * Показать карты на столе
   * @param {Object} info
   */
  showTableCards(info) {
    this.animation.showBankCards(info.indexes, info.cards);
  }
  /**
   * Передать ход игроку
   * @param {Object} playerInfo
   */
  enablePlayer(playerInfo) {
    this.animation.shinePlayer(playerInfo.id);
    if (playerInfo.id === this.players[0]) {
      MultiPlayerView.enableButtonPanel(playerInfo.callCheck, playerInfo.score);
    }
  }
  /**
   * Покинуть раунд
   * @param {Object} playerInfo
   */
  turnOffPlayer(playerInfo) {
    this.animation.removePlayerCards(playerInfo.id);
  }
  /**
   * Указать игрока, сделавшего check
   * @param {Object} playerInfo
   */
  setCheck(playerInfo) {

  }

  /**
   * Указать минимальную ставку
   * @param {Object} betInfo
   */
  minBet(betInfo) {
    document.getElementById('raiseSlider').min = betInfo.min;
  }
  /**
   * Установить счет банка
   * @param {Object} info
   */
  setBank(info) {
    document.getElementById('bank').textContent = info.score;
  }
  /** Сделать check*/
  check() {
    this.socket.send('check');
  }
  /** Сделать call*/
  call() {
    this.socket.send('call');
  }

  /**
   * Сделать raise
   * @param {string} bet
   */
  raise(bet) {
    this.socket.send(`raise ${bet}`);
  }
  /** Сделать fold*/
  fold() {
    this.socket.send('fold');
  }
}
