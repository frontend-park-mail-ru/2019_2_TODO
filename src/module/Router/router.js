import AjaxModule from '../AjaxModule/ajax';

/** Роутер*/
export default class Router {
  /**
   * Создать роутер
   * @param {HTMLElement} root
   */
  constructor(root) {
    this.routes = {};
    this.root = root;
  }
  /**
   * Зарегестривать путь
   * @param {string} path
   * @param {BaseView} View
   * @return {Router}
   */
  register(path, View) {
    this.routes[path] = {
      View: View,
      view: null,
      el: null,
    };
    return this;
  }

  /**
   * Удалить путь
   * @param {string} path
   */
  remove(path){
    this.routes[path] = undefined;
  }
  /**
   * Открыт путь
   * @param {string} path
   */
  open(path) {
    const route = this.routes[path];
    if (!route) {
      this.open('/notFound');
      return;
    }
    window.history.pushState(
        null,
        '',
        path
    );
    let {View, view, el} = route;
    if (!el) {
      el = document.createElement('section');
      this.root.appendChild(el);
    }
    if (!view) {
      view = new View(el);
    }
    if (!view.active) {
      Object.values(this.routes).forEach(({view, el}) => {
        if (view && view.active) {
          view.hide();
        }
      });
      view.show();
    }
    this.routes[path] = {View, view, el};
  }
  /**
   * Переотресовать view
   * @param {string} path
   */
  reRender(path) {
    const route = this.routes[path];
    const {el} = route;
    if (!el) {
      this.open(path);
    }
    this.root.removeChild(el);
    this.routes[path].el = null;
    this.routes[path].view = null;
    this.open(path);
  }

  /**
   * Начать роутинг
   */
  start() {
    this.root.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLAnchorElement)) {
        const {target} = event;
        if (target.id === 'logout') {
          AjaxModule.logOut(document.getElementById('application'));
        }
        return;
      }
      event.preventDefault();
      // event.stopImmediatePropagation();
      const link = event.target;
      this.open(link.pathname);
    });
    window.addEventListener('popstate', () => {
      const currentPath = window.location.pathname;
      this.open(currentPath);
    });
    const currentPath = window.location.pathname;
    this.open(currentPath);
  }
}