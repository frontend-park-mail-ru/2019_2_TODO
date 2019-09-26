import {startScreen} from "./components/StartScreen/StartScreen.js";
import {SignUpScreen} from "./components/SignUpScreen/SignUpScreen.js";
import {SignInScreen} from "./components/SignInScreen/SignInScreen.js";
import {HeaderComponent} from "./components/Header/Header.js";


const application = document.getElementById('application');

const functions = {
    start: startScreen,
    signUp: SignUpScreen,
    signIn: SignInScreen,
    //profile: createProfile,
    //about: null,
};
application.addEventListener('click', evt => {
    const {target} = evt;
    if ((target instanceof HTMLButtonElement) || (target instanceof HTMLImageElement)) {
        evt.preventDefault();
        functions[target.dataset.section](application);
    }
});

startScreen(application);
//SignInScreen(application);
//SignUpScreen(application);


