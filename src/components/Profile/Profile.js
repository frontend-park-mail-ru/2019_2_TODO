import BaseComponent from "../BaseComponent/BaseComponent.js";
import {startScreen} from "../StartScreen/StartScreen.js";


export class Profile extends BaseComponent {
    constructor(context){
        super();
        this.context = context;
        this.template = Handlebars.compile(`
        <form class="profileForm">
            <button class="closeProfileButton" id="closeButton">Close</button>
            <img class="avatar" src="{{avatar}}" alt="">
            <a class="profileText">{{nickname}}</a>
            <a class="profileText">{{score}}</a>
            <button class="profileButton">Change</button> 
        </form>
        `)
    }
}

export const RenderProfile = (application, context = {avatar: "./assets/gold_fishka.jpg", nickname: "nickname", score: "1000"}) => {
    const profile = new Profile(context);
    application.innerHTML += profile.render();
    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', evt => {
        evt.preventDefault();
        startScreen(application);
    })
}