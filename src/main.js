import Router from './module/router.js';
import StartScreen from './components/viewes/StartScreen/StartScreen.js';
import SignUpScreen from './components/viewes/SignUpScreen/SignUpScreen.js';
import SignInScreen from './components/viewes/SignInScreen/SignInScreen.js';
import ChangeProfileView from './components/viewes/Profile/ChangeProfile.js';
import NotFoundView from './components/viewes/NotFoundView/NotFoundView.js';
import ProfileView from './components/viewes/Profile/Profile.js';
import OfflineGameView from './components/viewes/OfflineGame/OfflineGameView.js';
import runtime from 'serviceworker-webpack-plugin/lib/runtime.js';

if ('serviceWorker' in navigator) {
    console.log(navigator);
    const registration = runtime.register();
}
const application = document.getElementById('application');
window.router = new Router(application);
window.router.register('/', StartScreen)
    .register('/signUp', SignUpScreen)
    .register('/signIn', SignInScreen)
    .register('/profileChange', ChangeProfileView)
    .register('/profile', ProfileView)
    .register('/offline', OfflineGameView)
    .register('/notFound', NotFoundView);
console.log(router.routes);
window.router.start();

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('sw.js')
//         .then((registration) => {
//             console.log('ServiceWorker registration', registration);
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// }
