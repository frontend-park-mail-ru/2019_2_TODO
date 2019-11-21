
// import StartScreen from '.';

/** Класс для использования fetch api. */
class AjaxModule {
  /**
   * отправить картинку
   * @param {HTMLElement} application - элемент для возврата
   * @param {FormData} data - картинка
   */
  postAvatar(data) {
    this.fetchPost('http://93.171.139.196:780/signin/profileImage/', data, {
      method: 'POST',
      credentials: 'include',
      body: data})
        .then((res) => {
          if (res.status === 200) {
            window.router.open('/profile');
            // window.router.reRender('/profile');
          }
        });
  }

  /**
   * Регистрация
   * @param {string} email
   * @param {string} password
   */
  signUp(email, password) {
    this.fetchPost('http://93.171.139.196:780/signup/',
        JSON.stringify({
          username: email,
          password: password,
        }))
        .then((rez) => {
          if (rez.status === 200) {
            window.location.pathname = '/';
            resolve(true);
          }
          resolve(false);
        });
  }

  /**
   * Авторизация
   * @param {string} email
   * @param {string} password
   */
  signIn(email, password) {
    this.fetchPost(
        'http://93.171.139.196:780/signin/',
        JSON.stringify({
          username: email,
          password: password,
        })
    ).then((res) => {
      if (res.status === 200) {
        window.location.pathname = '/';
        resolve(true);
      }
      resolve(false);
    });
  }

  /**
   * Выход
   * @param {HTMLElement} application - элемент для возврата
   */
  logOut(application) {
    this.fetchGet('http://93.171.139.196:780/logout/')
        .then((res) => {
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
      params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        body: body}) {
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
