import {PokerCSSAnimation} from '../Animation/PokerCSSAnimation';


export default class MultiPlayer {
  constructor() {
    this.socket = new WebSocket('ws://93.171.139.196:780/multiplayer/?name='+user.username );
    this.socket.onopen = ()=>{
      console.log('opened');
    };
    this.socket.onmessage = (msg)=>{
        console.log(msg);
      console.log(JSON.parse(msg.data));
    };
    this.socket.onerror = (err)=> {
        console.log(err);
    };
    // this.animation = new PokerCSSAnimation();
  }
  addPlayer() {
     MultiPlayerView.addPlayer();
  }
  ready(){
    this.socket.send('ready');
  }
  check() {
    this.socket.send();
  }
}
