import {ButtonComponent} from '../../../Button/Button.js';
import {ImageComponent} from '../../../Image/Image.js';
import {InputComponent} from '../../../Input/Input.js';
import AjaxModule from '../../../../module/ajax.js';
import BaseView from '../../BaseView/BaseView.js';
import {TextComponent} from '../../../TextComponent/Text.js';
import BaseComponent from '../../../BaseComponent/BaseComponent.js';
import template from './ChangeProfile.hbs';

class profileChange extends BaseComponent{
  constructor(context){
    super(context)
    this.template = template;
  }
}

export default class ChangeProfileView extends BaseView {
  constructor(element, context = {
    avatar: './assets/gold_fishka.jpg',
    nickname: 'nickname',
    score: '1000',
  }) {
    super(element);
    this.context = context;
  }

  render() {
    const application = this.el;
    AjaxModule.fetchGet('http://93.171.139.196:780/signin/')
        .catch(()=>{
          this.el.innerHTML = '';
          const prof = new profileChange({
            avatar: 'https://jok.io/Images/Shared/unknown_female.png',
            username: 'username',
          });
          this.el.innerHTML += prof.render();
        })
        .then((res) => {
          return res.text();
        })
        .then((resT) => {
          console.log(resT);
          const form = document.createElement('form');
          application.innerHTML = '';
          application.appendChild(form);
          form.className = 'profileForm';
          const closeButton = new TextComponent({
            tag: 'a',
            id: 'cl',
            href: '/profile',
            class: 'button profileForm__button',
            text: 'close',
          });
          form.innerHTML += closeButton.render();
          const avatar = new ImageComponent({
            class: 'profileForm__avatar',
            source: JSON.parse(resT).image,
          });
          const avatarInput = new InputComponent({
            type: 'file',
            class: 'profileForm__input',
            id: 'avatarInput',
            placeholder: JSON.parse(resT).image,
          });
          avatarInput.render();
          form.innerHTML += avatar.render();
          form.innerHTML += avatarInput.render();
          const changeAvButton = new ButtonComponent({
            type: 'submit',
            class: 'profileForm__button',
            id: 'changeAv',
            text: 'Upload avatar',
          });
          form.innerHTML += changeAvButton.render();

          const nickname = new InputComponent({
            class: 'profileForm__input',
            id: 'nick',
            placeholder: JSON.parse(resT).username,
          });
          form.innerHTML += nickname.render();
          const password = new InputComponent({
            class: 'profileForm__input',
            id: 'pass',
            type: 'password',
            placeholder: 'new password',
          });
          const passwordRepeat = new InputComponent({
            class: 'profileForm__input',
            id: 'passr',
            type: 'password',
            placeholder: 'repeat Passwor',
          });

          form.innerHTML += password.render();
          form.innerHTML += passwordRepeat.render();
          const changeButton = new ButtonComponent({
            id: 'changeNP',
            type: 'submit',
            class: 'profileForm__button',
            text: 'change',
          });
          form.innerHTML += changeButton.render();

          // const profile = new ChangeProfile(context);
          // application.innerHTML = profile.render();
          const avButton = document.getElementById('changeAv');
          const npButton = document.getElementById('changeNP');
          avButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            const av = form.elements.avatarInput;
            const data = new FormData();
            data.append('image', av.files[0]);
            AjaxModule.postAvatar(application, data);
          });
          npButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            const nick = form.elements.nick.value;
            const pass = form.elements.pass.value;
            const passRepeat = form.elements.passr.value;
            if (pass !== passRepeat) {
              password.error('PASSWORDS_MATCH', form);
              return;
            }
            if ((pass.length < 5)&&(pass.length > 0)) {
              password.error('PASSWORD_LENGTH', form);
              return;
            }
            AjaxModule.fetchPost(
                'http://93.171.139.196:780/signin/profile/',
                JSON.stringify({
                  username: nick,
                  password: pass,
                })
            )
                .then((res) => {
                  if (res.status === 200) {
                    console.log(res);
                    window.router.open('/');
                  }
                });
          });
        });
  }
}

/**
 * Отрисоват профиль
 * @param {HTMLElement} application - контейнер HTML,
 * в котором отрисовывается верстка
 * @param {Object} context - контекст для шаблонизатора
 */
// export const renderProfile = (
//     application,
//     context = {
//       avatar: './assets/gold_fishka.jpg',
//       nickname: 'nickname',
//       score: '1000',
//     }) => {
//   AjaxModule.fetchGet('http://93.171.139.196:780/signin/')
//       .then((res) => {
//         return res.text();
//       })
//       .then((resT) => {
//         console.log(resT);
//         const form = document.createElement('form');
//         application.innerHTML = '';
//         application.appendChild(form);
//         form.className = 'profileForm';
//         const closeButton = new ButtonComponent({
//           id: 'cl',
//           class: 'profileForm__button',
//           text: 'close',
//         });
//         form.innerHTML += closeButton.render();
//         const avatar = new ImageComponent({
//           class: 'profileForm__avatar',
//           source: JSON.parse(resT).image,
//         });
//         const avatarInput = new InputComponent({
//           type: 'file',
//           class: 'profileForm__input',
//           id: 'avatarInput',
//           placeholder: JSON.parse(resT).image,
//         });
//         avatarInput.render();
//         form.innerHTML += avatar.render();
//         form.innerHTML += avatarInput.render();
//         const changeAvButton = new ButtonComponent({
//           type: 'submit',
//           class: 'profileForm__button',
//           id: 'changeAv',
//           text: 'Upload avatar',
//         });
//         form.innerHTML += changeAvButton.render();
//
//         const nickname = new InputComponent({
//           class: 'profileForm__input',
//           id: 'nick',
//           placeholder: JSON.parse(resT).username,
//         });
//         form.innerHTML += nickname.render();
//         const password = new InputComponent({
//           class: 'profileForm__input',
//           id: 'pass',
//           type: 'password',
//           placeholder: 'new password',
//         });
//         const passwordRepeat = new InputComponent({
//           class: 'profileForm__input',
//           id: 'passr',
//           type: 'password',
//           placeholder: 'repeat Passwor',
//         });
//
//         form.innerHTML += password.render();
//         form.innerHTML += passwordRepeat.render();
//         const changeButton = new ButtonComponent({
//           id: 'changeNP',
//           type: 'submit',
//           class: 'profileForm__button',
//           text: 'change',
//         });
//         form.innerHTML += changeButton.render();
//
//         // const profile = new ChangeProfile(context);
//         // application.innerHTML = profile.render();
//         const clButton = document.getElementById('cl');
//         const avButton = document.getElementById('changeAv');
//         const npButton = document.getElementById('changeNP');
//         avButton.addEventListener('click', (evt) => {
//           evt.preventDefault();
//           const av = form.elements.avatarInput;
//           const data = new FormData();
//           data.append('image', av.files[0]);
//           AjaxModule.fetchPost('http://93.171.139.196:780/signin/profileImage/', data)
//               .then((res) => {
//                 console.log(res.status);
//                 if (res.status === 200) {
//                   console.log(res);
//                   renderProfile(application);
//                 }
//               });
//         });
//         npButton.addEventListener('click', (evt) => {
//           evt.preventDefault();
//           const nick = form.elements.nick.value;
//           const pass = form.elements.pass.value;
//           const passRepeat = form.elements.passr.value;
//           if (pass !== passRepeat) {
//             password.error('PASSWORDS_MATCH', form);
//             return;
//           }
//           if (pass.length < 5) {
//             password.error('PASSWORD_LENGTH', form);
//             return;
//           }
//           AjaxModule.fetchPost(
//               'http://93.171.139.196:780/signin/profile/',
//               JSON.stringify({
//                 username: nick,
//                 password: pass,
//               })
//           )
//               .then((res) => {
//                 if (res.status === 200) {
//                   console.log(res);
//                   renderProfile(application);
//                 }
//               });
//         });
//
//         clButton.addEventListener('click', (evt) => {
//           evt.preventDefault();
//           //startScreen(application);
//         });
//       });
// };
