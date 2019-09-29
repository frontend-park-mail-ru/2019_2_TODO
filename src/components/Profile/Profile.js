import BaseComponent from "../BaseComponent/BaseComponent.js";
import {StartScreen} from "../StartScreen/StartScreen.js";
import {ButtonComponent} from "../Button/Button.js";
import {ImageComponent} from "../Image/Image.js";
import {TextComponent} from "../TextComponent/Text.js";
import {InputComponent} from "../Input/Input.js";


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
    AjaxModule._fetchGet("http://93.171.139.196:780/signin/")
        .then(res => {
           res.body;
        })
        .then(res => {
            const form = document.createElement('form');
            application.innerHTML = '';
            application.appendChild(form);
            form.className = "profileForm";
            const closeButton = new ButtonComponent({
                className: "closeProfileButton"
            });
            form.innerHTML += closeButton.render();
            const avatar = new ImageComponent({
                className: "avatar",
                src: "./assets/gold_fishka.jpg"
            });
            const avatarInput = new InputComponent( {
                type: "file",
                className: "avatarInput",
                id: "avatarInput",
                placeholder: "Upload avatar"
            });
            avatarInput.render();
            form.innerHTML += avatar.render();
            const nickname = new TextComponent({
                className: "profileText",
                text: ""
            });
            form.innerHTML += nickname.render();
            const score = new TextComponent({
                className: "profileText",
                text: "1000"
            });
            form.innerHTML += score.render();
            const changeButton = new ButtonComponent({
                type: 'submit',
                className: "",
                text: "cheange"
            });
            form.innerHTML += changeButton.render();
                //const profile = new Profile(context);
            //application.innerHTML = profile.render();
            const clButton = document.getElementById('cl');

            clButton.addEventListener('click', evt => {
                evt.preventDefault();
                StartScreen(application);
            })

        });

};