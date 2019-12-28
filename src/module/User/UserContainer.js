import AjaxModule from '../AjaxModule/ajax';

/** Класс для работы с информацией пользователя*/
export default class User {
  /** Инициализация данных*/
  constructor() {
    this.isAuth = false;
    this.username = 'unAuthorized';
    this.avatar = 'https://jok.io/Images/Shared/unknown_female.png';
    this.id = null;
  }

  /**
   * Проверка авторизации
   * @return {Promise<string>}
   */
  checkAuth() {
    return AjaxModule.fetchGet('/api/signin/')
        .catch((res) => {
          console.log(res);
        })
        .then((res) => {
          //console.log(res);
          return res.text();
        })
        .then((resText) => {
          if (resText) {
            this.username = JSON.parse(resText).username;
            this.avatar = JSON.parse(resText).image;
            this.isAuth = true;
            this.id = JSON.parse(resText).id;
          }
        });
  }

  /**
   * Авторизация
   * @param {string} username
   * @param {string} password
   */
  auth(username, password) {
    AjaxModule.signIn(username, password);
  }

  /**
   * Регистрация
   * @param {string} username
   * @param {string} password
   */
  signUp(username, password) {
    this.isAuth = AjaxModule.signUp(username, password);
    if (this.isAuth) {
      this.username = username;
    }
  }

  /**
   * Поменять аватар
   * @param {FormData} data
   */
  changeAvatar(data) {
    AjaxModule.postAvatar(data);
  }

  /**
   * Поменять данные
   * @param {string} username
   * @param {string} password
   */
  changeData(username, password) {
    AjaxModule.fetchPost(
        '/api/signin/profile/',
        JSON.stringify({
          username: username,
          password: password,
        })
    )
        .then((res) => {
          if (res.status === 200) {
            if (username !== '') {
              this.username = username;
            }
            window.router.open('/');
          }
        });
  }
  /** Лог аут*/
  logOut() {
    AjaxModule.logOut();
  }
}
