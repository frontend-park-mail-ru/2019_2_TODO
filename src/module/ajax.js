
/*
*Класс для использования fetch api
 */

import {StartScreen} from "../components/StartScreen/StartScreen.js";

class AjaxModule {

  postImage(application, imageFile) {
    const data = new FormData();
    data.append('image', imageFile);
    AjaxModule.fetchPost('http://93.171.139.196:780/signin/profileImage/', data)
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            RenderProfile(application);
          }
        });
  }

  signUp(application, email, password) {
    this.fetchPost('http://93.171.139.196:780/signin/profile',
        JSON.stringify({
          username: email,
          password: password,
        }))
        .then((rez) => {
          if (rez.status === 200) {
            console.log(rez);
            StartScreen(application);
          }
        });
  }

  signIn(application, email, password) {
    this.fetchPost(
        'http://93.171.139.196:780/signin/',
        JSON.stringify({
          username: email,
          password: password,
        })
    ).then((res) => {
          if (res.status === 200) {
            console.log('sdcsdv');
            StartScreen(application);
          }
        });
  }


  fetchPost(
      url = 'http://93.171.139.196:780/',
      body = {},
      params = {method: 'POST', credentials: 'include', body: body}) {
    return fetch(url, params);
  }

  fetchGet(url = 'http://93.171.139.196:780/',
           params = {method: 'GET', credentials: 'include'}) {
    return fetch(url, params);
  }
}

export default new AjaxModule();
