import AjaxModule from '../AjaxModule/ajax';

export default class Router {
  constructor(root) {
    this.routes = {};
    this.root = root;
  }

  /**
     * @param {string} path
     * @param {BaseView} View
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
     * @param {string} path
     */
  open(path) {
    const route = this.routes[path];

    if (!route) {
      this.open('/notFound');
      return;
    }

    if (window.location.pathname !== path) {
      window.history.pushState(
          null,
          '',
          path
      );
    }

    let {View, view, el} = route;

    if (!el) {
      el = document.createElement('section');
      this.root.appendChild(el);
    }

    if (!view) {
      view = new View(el);
    }

    if (!view.active) {
      Object.values(this.routes).forEach(({view}) => {
        if (view && view.active) {
          view.hide();
        }
      });

      view.show();
    }

    this.routes[path] = {View, view, el};
  }

  reRender(path) {
    const route = this.routes[path];
    const {View, view, el} = route;
    if (!el) {
      this.open(path);
    }
    this.root.removeChild(el);
    this.routes[path].el = null;
    this.routes[path].view = null;
    this.open(path);
  }

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
