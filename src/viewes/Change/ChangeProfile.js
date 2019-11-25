import BaseView from '../BaseView/BaseView.js';
import InputError from '../../components/Input/Input.js';
import ChangeProfile from '../../components/ChangeProfile/ChangeProfile';


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
    const prof = new ChangeProfile({
      username: user.username,
      avatar: user.avatar,
    });
    this.el.innerHTML = prof.render();
    this.el.addEventListener('click', (evt) => {
      if (evt.target.id === 'changeAv') {
        evt.preventDefault();
        const av = document.getElementById('avatarInput');
        const data = new FormData();
        data.append('image', av.files[0]);
        user.changeAvatar(data);
      }
      if (evt.target.id === 'changeNP') {
        evt.preventDefault();
        const nick = document.getElementById('nick').value;
        const pass = document.getElementById('pass').value;
        const passRepeat = document.getElementById('passr').value;
        if (pass !== passRepeat) {
          InputError.e('PASSWORDS_MATCH', this.el.lastChild);
          return;
        }
        if ((pass.length < 5) && (pass.length > 0)) {
          InputError.e('PASSWORD_LENGTH', this.el.lastChild);
          return;
        }
        user.changeData(nick, pass);
      }
    });
  }
}
