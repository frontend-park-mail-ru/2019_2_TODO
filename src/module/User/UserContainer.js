import AjaxModule from '../AjaxModule/ajax';

export default class User {
  constructor() {
    this.isAuth = false;
    this.username = 'unAuthorized';
    this.avatar = 'https://jok.io/Images/Shared/unknown_female.png';
  }

  checkAuth() {
    return AjaxModule.fetchGet('http://93.171.139.196:780/signup/')
        .catch(() => {
        })
        .then((res) => {
          return res.text();
        })
        .then((resText) => {
          this.isAuth = true;
          this.username = JSON.parse(resText).username;
          this.avatar = JSON.parse(resText).image;
        })
  }

  auth(username, password) {
    this.isAuth = AjaxModule.signIn(username, password);
    if (this.isAuth) {
      this.username = username;
    }
  }

  signUp(username, password) {
    this.isAuth = AjaxModule.signUp(username, password);
    if (this.isAuth) {
      this.username = username;
    }
  }
  changeAvatar(data){
    AjaxModule.postAvatar(data);
  }
  changeData(username, password){
    AjaxModule.fetchPost(
        'http://93.171.139.196:780/signin/profile/',
        JSON.stringify({
          username: username,
          password: password,
        })
    )
        .then((res) => {
          if (res.status === 200) {
            if (username !== ''){
              this.username = username;
            }
            window.router.open('/');
          }
        });
  }
}