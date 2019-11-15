import AjaxModule from '../../../../module/ajax.js';
import BaseView from '../../BaseView/BaseView.js';
import BaseComponent from '../../../BaseComponent/BaseComponent.js';
import template from './ChangeProfile.hbs';
import InputError from '../../../Input/Input.js';

class ProfileChange extends BaseComponent {
  constructor(context) {
    super(context);
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
    AjaxModule.fetchGet('http://93.171.139.196:780/signin/')
        .catch(()=>{
          this.el.innerHTML = '';
          const prof = new ProfileChange({
            avatar: 'https://jok.io/Images/Shared/unknown_female.png',
            username: 'username',
          });
          this.el.innerHTML += prof.render();
        })
        .then((res) => {
          return res.text();
        })
        .then((resT) => {
          const prof = new ProfileChange({
            username: JSON.parse(resT).username,
            avatar: JSON.parse(resT).image,
          });
          this.el.innerHTML = prof.render();
          // const form = document.createElement('form');
          // application.innerHTML = '';
          // application.appendChild(form);
          // form.className = 'profileForm';
          // const closeButton = new TextComponent({
          //   tag: 'a',
          //   id: 'cl',
          //   href: '/profile',
          //   class: 'button profileForm__button',
          //   text: 'close',
          // });
          // form.innerHTML += closeButton.render();
          // const avatar = new ImageComponent({
          //   class: 'profileForm__avatar',
          //   source: JSON.parse(resT).image,
          // });
          // const avatarInput = new InputComponent({
          //   type: 'file',
          //   class: 'profileForm__input',
          //   id: 'avatarInput',
          //   placeholder: JSON.parse(resT).image,
          // });
          // avatarInput.render();
          // form.innerHTML += avatar.render();
          // form.innerHTML += avatarInput.render();
          // const changeAvButton = new ButtonComponent({
          //   type: 'submit',
          //   class: 'profileForm__button',
          //   id: 'changeAv',
          //   text: 'Upload avatar',
          // });
          // form.innerHTML += changeAvButton.render();
          //
          // const nickname = new InputComponent({
          //   class: 'profileForm__input',
          //   id: 'nick',
          //   placeholder: JSON.parse(resT).username,
          // });
          // form.innerHTML += nickname.render();
          // const password = new InputComponent({
          //   class: 'profileForm__input',
          //   id: 'pass',
          //   type: 'password',
          //   placeholder: 'new password',
          // });
          // const passwordRepeat = new InputComponent({
          //   class: 'profileForm__input',
          //   id: 'passr',
          //   type: 'password',
          //   placeholder: 'repeat Passwor',
          // });
          //
          // form.innerHTML += password.render();
          // form.innerHTML += passwordRepeat.render();
          // const changeButton = new ButtonComponent({
          //   id: 'changeNP',
          //   type: 'submit',
          //   class: 'profileForm__button',
          //   text: 'change',
          // });
          // form.innerHTML += changeButton.render();

          // const profile = new ChangeProfile(context);
          // application.innerHTML = profile.render();
          // const avButton = document.getElementById('changeAv');
          // const npButton = document.getElementById('changeNP');
          this.el.addEventListener('click', (evt) => {
            if (evt.target.id === 'changeAv') {
              evt.preventDefault();
              const av = document.getElementById('avatarInput');
              const data = new FormData();
              data.append('image', av.files[0]);
              AjaxModule.postAvatar(application, data);
            }
            if (evt.target.id === 'changeNP') {
              evt.preventDefault();
              const nick = document.getElementById('nick').value;
              const pass = document.getElementById('pass').value;
              const passRepeat = document.getElementById('passr').value;
              if (pass !== passRepeat) {
                InputError.error('PASSWORDS_MATCH', this.el.lastChild);
                return;
              }
              if ((pass.length < 5)&&(pass.length > 0)) {
                InputError.error('PASSWORD_LENGTH', this.el.lastChild);
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
                      window.router.open('/');
                    }
                  });
            }
          });
        });
  }
}
