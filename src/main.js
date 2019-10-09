import Router from "./module/router.js";
import StartScreen from "./components/viewes/StartScreen/StartScreen.js";
import SignUpScreen from "./components/viewes/SignUpScreen/SignUpScreen.js";
import SignInScreen from "./components/viewes/SignInScreen/SignInScreen.js";

const application = document.getElementById('application');
const router = new Router(application);

router.register('/', StartScreen)
    .register('/signUp', SignUpScreen)
    .register('/signIn', SignInScreen);
console.log(router.routes);
router.start();
