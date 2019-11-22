import {PokerCSSAnimation} from "../Animation/PokerCSSAnimation";


export default class MultiPlayer {
    constructor(){
        this.socket = new WebSocket('ws://93.171.139.196:780/');
        this.socket.onopen =
        this.animation = new PokerCSSAnimation();
    }
    addPlayer(){

    }
    check(){
        this.socket.send()
    }
}