import Router from "./module/router.js";
import StartScreen from "./components/viewes/StartScreen/StartScreen.js";
import SignUpScreen from "./components/viewes/SignUpScreen/SignUpScreen.js";
import SignInScreen from "./components/viewes/SignInScreen/SignInScreen.js";
import ProfileView from "./components/viewes/Profile/Profile.js";

const application = document.getElementById('application');
const router = new Router(application);

router.register('/', StartScreen)
    .register('/signUp', SignUpScreen)
    .register('/signIn', SignInScreen)
    .register('/profile', ProfileView);
console.log(router.routes);
router.start();
