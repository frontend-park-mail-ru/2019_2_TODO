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
  startAnimation(){
    this.animation = new PokerCSSAnimation(this.players);
    this.animation.prepairGame();
  }
  showPlayerCards(playerInfo){
    this.animation.showPlayerCards(playerInfo.id, playerInfo.Hand);
  }
  ready(){
    this.socket.send('ready');
  }
  check() {
    this.socket.send();
  }
}
