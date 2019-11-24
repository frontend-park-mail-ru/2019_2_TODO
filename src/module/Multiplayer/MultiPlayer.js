import {PokerCSSAnimation} from '../Animation/PokerCSSAnimation';
import MultiPlayerView from "../../viewes/MultiplayerView/MultiPlayerView";


export default class MultiPlayer {
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
  addPlayer(playerInfo) {
    console.log(playerInfo);
      MultiPlayerView.addPlayer(playerInfo.id, playerInfo.username, playerInfo.score, 'multiplayer__players');
      this.players.push(playerInfo.id);
  }
  removePlayer(playerId){
    document.getElementById(playerId).remove();
  }
  quitGame(){
    this.socket.close();
  }
  startGame(playerInfo){
    console.log('Animation');
    this.animation = new PokerCSSAnimation(this.players);
    this.animation.startRoundAnimation();
    this.showPlayerCards(playerInfo);
    this.updatePlayerScore(playerInfo);
  }
  showPlayerCards(playerInfo){
    console.log(playerInfo.hand);
    this.animation.showPlayerCards(playerInfo.id, playerInfo.hand);
  }
  updatePlayerScore(playerInfo){
    document.getElementById(playerInfo.id+'Score').innerText = `${playerInfo.score}/${playerInfo.bet||0}`;
  }
  ready(){
    this.socket.send('ready');
  }
  enablePlayer(playerInfo){
    MultiPlayerView.enableButtonPanel(playerInfo.callCheck);
  }
  check() {
    this.socket.send('check');
  }
  call() {
    this.socket.send('call');
  }
  raise(bet){
    this.socket.send(`raise ${bet}`);
  }
  fold(){
    this.socket.send('fold')
  }
}
