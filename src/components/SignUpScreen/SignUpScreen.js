import {InputComponent} from "../Input/Input.js";
import {HeaderComponent} from "../Header/Header.js";
import {ButtonComponent} from "../Button/Button.js";
import {TextComponent} from "../TextComponent/Text.js";
import {StartScreen} from "../StartScreen/StartScreen.js";
import {SignInScreen} from "../SignInScreen/SignInScreen.js";


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
        id: "email",
        placeholder: "Email"
    });
    form.innerHTML += EmailInput.render();
    const PassInput = new InputComponent({
        type: "password",
        id: "password",
        placeholder: "Password"
    });
    form.innerHTML += PassInput.render();
    const PassRepeat = new InputComponent({
        type: "password",
        id: "passwordRepeat",
        placeholder: "Repeat your password"
    });
    form.innerHTML += PassRepeat.render();
    const SubmitButton = new ButtonComponent({
        href: "/",
        type: "submit",
        text: "Sign up!"
    });
    form.innerHTML += SubmitButton.render();

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = form.elements['email'].value;
        const password = form.elements['password'].value;
        const passwordRepeat = form.elements['passwordRepeat'].value;
        if (password !== passwordRepeat) {
            alert("Passwords are'nt equal");
            return
        }
        if (!email) {
            alert("No email");
            return;
        }


        AjaxModule._fetchPost(
            "http://93.171.139.196:780/signup",
            JSON.stringify({
                username: email,
                password: password
            })
            ).then(rez => {
            if (rez.status === 200) {
                SignInScreen();
            }
        });

                // const {error} = JSON.parse(responseText);
                // if (error) {
                //     alert(error);
                // } else {
                //     alert('error')
                // }

    })

};