import {PokerCSSAnimation} from '../Animation/PokerCSSAnimation';
import MultiPlayerView from '../../viewes/MultiplayerView/MultiPlayerView';


export default class MultiPlayer {
  constructor() {
    this.socket = new WebSocket('ws://93.171.139.196:780/multiplayer');
    this.socket.onopen = ()=>{
      console.log('opened');
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
