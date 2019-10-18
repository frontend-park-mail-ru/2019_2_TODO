import Router from './module/router.js';
import StartScreen from './components/viewes/StartScreen/StartScreen.js';
import SignUpScreen from './components/viewes/SignUpScreen/SignUpScreen.js';
import SignInScreen from './components/viewes/SignInScreen/SignInScreen.js';
import ChangeProfileView from './components/viewes/Profile/ChangeProfile.js';
import NotFoundView from './components/viewes/NotFoundView/NotFoundView.js';
import ProfileView from "./components/viewes/Profile/Profile.js";
import OfflineGame from "./components/viewes/OfflineGame/OfflineGame.js";

const application = document.getElementById('application');
window.router = new Router(application);

window.router.register('/', StartScreen)
    .register('/signUp', SignUpScreen)
    .register('/signIn', SignInScreen)
    .register('/profileChange', ChangeProfileView)
    .register('/profile', ProfileView)
    .register('/offline', OfflineGame)
    .register('/notFound', NotFoundView);
console.log(router.routes);
window.router.start();
