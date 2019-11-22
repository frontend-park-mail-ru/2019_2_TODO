import {HeaderComponent} from '../../components/Header/Header.js';
import AjaxModule from '../../module/AjaxModule/ajax.js';
import BaseView from '../BaseView/BaseView.js';
import {MenuBar} from "../../components/MenuBar/MenuBar";


export default class StartScreen extends BaseView {
  constructor(element) {
    super(element);
  }

  render() {
    this.el.innerHTML = '';
    const application = this.el;
    const header = new HeaderComponent(application, user.isAuth, user.avatar, user.username);
    header.render();
    const menuBar = new MenuBar(application);
    menuBar.render();
    if (user.isAuth){
      header.addListener('logout');
    }
  }
}
