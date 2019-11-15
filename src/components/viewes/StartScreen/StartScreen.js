import {HeaderComponent} from '../../Header/Header.js';
import AjaxModule from '../../../module/ajax.js';
import BaseView from '../BaseView/BaseView.js';
import {MenuBar} from "../../MenuBar/MenuBar";


export default class StartScreen extends BaseView {
  constructor(element) {
    super(element);
  }

  render() {
    this.el.innerHTML = '';
    const application = this.el;
    AjaxModule.fetchGet('http://93.171.139.196:780/signin/')
        .catch((res) => {
          const header = new HeaderComponent(application);
          header.render();
          const menuBar = new MenuBar(application);
          menuBar.render();
        })
        .then((res) => res.text())
        .then((resText) => {
          if (resText) {
            window.username = JSON.parse(resText).username;
            window.avatar = JSON.parse(resText).image;
            const header = new HeaderComponent(application, true, window.avatar, window.username);
            header.render();
            const menuBar = new MenuBar(application);
            menuBar.render();
            header.addListener();
          } else {
            const header = new HeaderComponent(application, false);
            header.render();
            const menuBar = new MenuBar(application);
            menuBar.render();
            // const smt = document.getElementById('infoAvatar');
          }
        });
  }
}
