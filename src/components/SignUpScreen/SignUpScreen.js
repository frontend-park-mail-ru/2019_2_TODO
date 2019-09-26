import {InputComponent} from "../Input/Input.js";
import {HeaderComponent} from "../Header/Header.js";
import {ButtonComponent} from "../Button/Button.js";
import {TextComponent} from "../TextComponent/Text.js";
import {startScreen} from "../StartScreen/StartScreen.js";


export const SignUpScreen = (application) => {
    application.innerHTML = '';
    const header = new HeaderComponent(application);
    header.render();
    const form = document.createElement('form');
    application.appendChild(form);
    const Text = new TextComponent({
        tag: "h3",
        text: "Registration!"
    });
    form.innerHTML += Text.render();
    const EmailInput = new InputComponent({
        type: "email",
        placeholder: "Email"
    });
    form.innerHTML += EmailInput.render();
    const PassInput = new InputComponent({
        type: "password",
        placeholder: "Password"
    });
    form.innerHTML += PassInput.render();
    const PassRepeat = new InputComponent({
        type: "password",
        placeholder: "Repeat your password"
    });
    form.innerHTML += PassRepeat.render();
    const SubmitButton = new ButtonComponent({type: "submit", text: "Sign up!"});
    form.innerHTML += SubmitButton.render();

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = form.elements['email'].value;
        const password = form.elements['password'].value;

        // AjaxModule.doPost({
        //     url: 'http://93.171.139.196:780/',
        //     body: {email, password},
        //     callback(status, responseText) {
        //         if (status === 201) {
        //             startScreen(application);
        //             return;
        //         }
        //         const {error} = JSON.parse(responseText);
        //         alert(error);
        //     }
        // });
    })

};