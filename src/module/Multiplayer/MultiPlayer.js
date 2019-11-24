import {PokerCSSAnimation} from '../Animation/PokerCSSAnimation';
import MultiPlayerView from '../../viewes/MultiplayerView/MultiPlayerView';

/** Общение по вебсокету с бекэндом*/
export default class MultiPlayer {
  /** конструктор*/
  constructor() {
    this.players = [];
    this.socket = new WebSocket('ws://93.171.139.196:780/multiplayer/?name='+user.username );
    this.socket.onopen = ()=>{
      console.log('opened');
    };
    this.socket.onmessage = (msg)=>{
      console.log(JSON.parse(msg.data));
      const {Command} = JSON.parse(msg.data);
      Object.keys(Command).forEach((key)=>{
        console.log(key);

        this[key](Command[key]);
      });
    };
    this.socket.onerror = (err)=> {
      console.log(err);
    };
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
        'multiplayer__players');
    this.players.push(playerInfo.id);
  }
  /**
   * убрать игрока
   * @param {Object} playerInfo
   */
  removePlayer(playerInfo) {
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
    const s = HandSolve(info.hand);
    console.log(s);
    this.animation.showWinnerCards(s.cards);
    setTimeout(()=>{
      this.animation.removeAllCards();
      this.ready();
    }, 4000);
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
    console.log('Animation');
    this.animation = new PokerCSSAnimation(this.players);
    this.animation.startRoundAnimation();
    this.showPlayerCards(playerInfo);
    this.updatePlayerScore(playerInfo);
  }
  /**
   * Показать карты
   * @param {Object} playerInfo
   */
  showPlayerCards(playerInfo) {
    console.log(playerInfo.hand);
    this.animation.showPlayerCards(playerInfo.id, playerInfo.hand);
  }
  /**
   * Обновить счет
   * @param {Object} playerInfo
   */
  updatePlayerScore(playerInfo) {
    document.getElementById(playerInfo.id+'Score')
        .innerText = `${playerInfo.score}/${playerInfo.bet||0}`;
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
