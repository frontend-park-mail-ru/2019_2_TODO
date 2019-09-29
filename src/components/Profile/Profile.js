import BaseComponent from "../BaseComponent/BaseComponent.js";
import {StartScreen} from "../StartScreen/StartScreen.js";
import {ButtonComponent} from "../Button/Button.js";
import {ImageComponent} from "../Image/Image.js";
import {TextComponent} from "../TextComponent/Text.js";
import {InputComponent} from "../Input/Input.js";
import AjaxModule from "../../module/ajax.js";

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
            return res.text();
        })
        .then(resT => {
            console.log(resT);
            const form = document.createElement('form');
            application.innerHTML = '';
            application.appendChild(form);
            form.className = "profileForm";
            const closeButton = new ButtonComponent({
                id: "cl",
                class: "ProfilButton",
                text: "close",
            });
            form.innerHTML += closeButton.render();
            const avatar = new ImageComponent({
                class: "chip",
                source: "./assets/gold_fishka.jpg"
            });
            const avatarInput = new InputComponent({
                type: "file",
                className: "avatarInput",
                id: "avatarInput",
                placeholder: JSON.parse(resT).image
            });
            avatarInput.render();
            form.innerHTML += avatar.render();
            form.innerHTML += avatarInput.render()
            const changeAvButton = new ButtonComponent({
                type: 'submit',
                className: "ProfileButton",
                id: "changeAv",

                text: "Upload avatar"
            });
            form.innerHTML += changeAvButton.render();

            const nickname = new InputComponent({
                className: "profileText",
                id: "nick",
                placeholder: JSON.parse(resT).username
            });
            form.innerHTML += nickname.render();
            const password = new InputComponent({
                class: "profileText",
                id: "pass",
                type: "password",
                placeholder: "new password"
            });
            const passwordRepeat = new InputComponent({
                class: "profileText",
                id: "passr",
                type: "password",
                placeholder: "repeat Passwor"
            });

            form.innerHTML += password.render();
            form.innerHTML += passwordRepeat.render();
            const changeButton = new ButtonComponent({
                id: "changeNP",
                type: 'submit',
                className: "ProfileButton",
                text: "change"
            });
            form.innerHTML += changeButton.render();

            //const profile = new Profile(context);
            //application.innerHTML = profile.render();
            const clButton = document.getElementById('cl');
            const avButton = document.getElementById('changeAv');
            const npButton = document.getElementById('changeNP');
            avButton.addEventListener('click', evt => {
                evt.preventDefault();
                const av = form.elements['avatarInput'];
                const data = new FormData();
                data.append("image", av.files[0]);
                AjaxModule._fetchPost("http://93.171.139.196:780/signin/profileImage/", data)
                    .then(res => {
                        if (res.status === 200) {
                            console.log(res);
                            RenderProfile(application)
                        }
                    })
            });
            npButton.addEventListener('click', evt => {
                evt.preventDefault();
                const nick = form.elements['nick'].value;
                const pass = form.elements['pass'].value;
                const passr = form.elements['passr'].value;
                if (!nick) {
                    alert("No email");
                    return;
                }
                if (pass !== passr) {
                    alert('no equel');
                }
                AjaxModule._fetchPost(
                    "http://93.171.139.196:780/signin/profile/",
                    JSON.stringify({
                        username: nick,
                        password: pass,
                    })
                )
                    .then(res => {
                        if (res.status === 200) {
                            console.log(res);
                            RenderProfile(application)
                        }
                    })
            })

            clButton.addEventListener('click', evt => {
                evt.preventDefault();
                StartScreen(application);
            })
        });

};
