
import StartScreen from '../components/viewes/StartScreen/StartScreen.js';

/** Класс для использования fetch api. */
class AjaxModule {
  /**
     * отправить картинку
     * @param {HTMLElement} application - элемент для возврата
     * @param {FormData} imageFile - картинка
     */
  postAvatar(application, imageFile) {
    const data = new FormData();
    data.append('image', imageFile);
    this.fetchPost('http://93.171.139.196:780/signin/profileImage/', data)
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            window.router.reRender('/profile');
          }
        });
  }

  /**
     * Регистрация
     * @param {HTMLElement} application - элемент для возврата
     * @param {string} email
     * @param {string} password
     */
  signUp(application, email, password) {
    this.fetchPost('http://93.171.139.196:780/signup/',
        JSON.stringify({
          username: email,
          password: password,
        }))
        .then((rez) => {
          if (rez.status === 200) {
            console.log(rez);
            window.router.reRender('/');
          }
        });
  }

  /**
     * Авторизация
     * @param {HTMLElement} application - элемент для возврата
     * @param {string} email
     * @param {string} password
     */
  signIn(application, email, password) {
    this.fetchPost(
        'http://93.171.139.196:780/signin/',
        JSON.stringify({
          username: email,
          password: password,
        })
    ).then((res) => {
        console.log('asca');
      if (res.status === 200) {
          console.log('___');
          window.router.reRender('/');
      }
    });
  }

  /**
     * Выход
     * @param {HTMLElement} application - элемент для возврата
     */
  logOut(application) {
    this.fetchGet('http://93.171.139.196:780/logout/')
        .then((res) => {
            console.log(res.status);
          if (res.status === 200) {
              window.router.reRender('/');
          }
        });
  }

  /**
     * POST запрос
     * @param {string} url - хост получателя
     * @param {Object} body - тело запроса
     * @param {Object} params - параметры запроса
     * @return {Promise<Response>} - промиз для обработки
     */
  fetchPost(
      url = 'http://93.171.139.196:780/',
      body = {},
      params = {method: 'POST', credentials: 'include', body: body}) {
    return fetch(url, params);
  }

  /**
     * GET запрос
     * @param {string} url - хост получателя
     * @param {Object} params - параметры запроса
     * @return {Promise<Response>} - промиз для обработки
     */
  fetchGet(url = 'http://93.171.139.196:780/',
      params = {method: 'GET', credentials: 'include'}) {
    return fetch(url, params);
  }
}

export default new AjaxModule();
