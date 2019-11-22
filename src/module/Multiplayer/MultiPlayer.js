import {PokerCSSAnimation} from '../Animation/PokerCSSAnimation';


export default class MultiPlayer {
  constructor() {
    this.socket = new WebSocket('ws://93.171.139.196:780/multiplayer/');
    this.socket.onopen = ()=>{
      console.log('opened');
    };
    this.socket.onmessage = (msg)=>{
        console.log(msg);
    };
    this.socket.onerror = (err)=> {
        console.log(err);
    };
    // this.animation = new PokerCSSAnimation();
  }
  addPlayer() {
    // MultiPlayerView.addPlayer();
  }
  check() {
    this.socket.send();
  }
}
