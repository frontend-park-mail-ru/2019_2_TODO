
/*
*Класс для использования fetch api
 */

class AjaxModule {
  _fetch(url = 'http://93.171.139.196:780/',
      params = {}
  ) {
    return fetch(url, params);
  }

  _fetchPost(
      url = 'http://93.171.139.196:780/',
      body = {},
      params = {method: 'POST', withCredentials: true, credentials: 'include', body: body}) {
    return fetch(url, params);
  }

  _fetchGet(url = 'http://93.171.139.196:780/',
      params = {method: 'GET', withCredentials: true, credentials: 'include'}) {
    return fetch(url, params);
  }
}

export default new AjaxModule();
