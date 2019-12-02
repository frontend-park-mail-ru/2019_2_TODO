
// import StartScreen from '.';

/** Класс для использования fetch api. */
class AjaxModule {
  /**
   * отправить картинку
   * @param {FormData} data - картинка
   */
  postAvatar(data) {
    this.fetchPost('/auth/signin/profileImage/', data, {
      method: 'POST',
      credentials: 'include',
      body: data})
        .then((res) => {
          if (res.status === 200) {
            user.checkAuth().then(()=> {
              window.router.open('/profile');
            });
            // window.router.open('/profile');
          }
        });
  }

  /**
   * Регистрация
   * @param {string} email
   * @param {string} password
   */
  signUp(email, password) {
    this.fetchPost('/auth/signup/',
        JSON.stringify({
          username: email,
          password: password,
        }))
        .then((rez) => {
          if (rez.status === 200) {
            router.open('/');
          }
        });
  }

  /**
   * Авторизация
   * @param {string} email
   * @param {string} password
   * @return {Promise}
   */
  signIn(email, password) {
    return this.fetchPost(
        '/auth/signin/',
        JSON.stringify({
          username: email,
          password: password,
        })
    ).then((res) => {
      if (res.status === 200) {
          user.checkAuth().then(()=>{
            router.open('/');
          });
      }
    });
  }

  /**
   * Выход
   */
  logOut() {
    this.fetchGet('/auth/logout/')
        .then((res) => {
          if (res.status === 200) {
            user.isAuth = false;
            router.open('/');
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
      url = '/auth/',
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
  fetchGet(url = '/auth/',
      params = {method: 'GET', credentials: 'include'}) {
    return fetch(url, params);
  }
}

export default new AjaxModule();
