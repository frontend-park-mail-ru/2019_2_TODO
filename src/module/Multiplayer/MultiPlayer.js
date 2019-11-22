import {PokerCSSAnimation} from '../Animation/PokerCSSAnimation';
import MultiPlayerView from "../../viewes/MultiplayerView/MultiPlayerView";


export default class MultiPlayer {
  constructor() {
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
    // this.animation = new PokerCSSAnimation();
  }
  addPlayer(playerInfo) {
    console.log(playerInfo);
      MultiPlayerView.addPlayer(playerInfo.id, playerInfo.username, playerInfo.score, 'multiplayer__players');
  }
  removePlayer(playerId){

  }
  quitGame(){
    this.socket.close();
  }
  ready(){
    this.socket.send('ready');
  }
  check() {
    this.socket.send();
  }
}
