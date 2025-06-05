class Route{
  constructor(handler, params) {
    this.handler = handler;
    this.params = params || {};
  }
}

class Router {
  static home = window.location.pathname;
  static routes = new Map();
  static #instance = null;

  static getInstance() {
    if (!Router.#instance) {
      Router.#instance = new Router();
    }
    return Router.#instance;
  }

  constructor() {
    if (Router.#instance) {
      throw new Error('Use Router.getInstance() to get the singleton instance.');
    }
      this.bindEvents();
  }

   addRoute(path, handler, params) {
    let route = new Route(handler, params);
     Router.routes.set(path, route);
  }

   navigate(url, params) {
    history.pushState(null, '', url);
    window.dispatchEvent(new CustomEvent('urlchange', { detail: { url: url} }));
  }

  // Bind event listeners for URL changes
  bindEvents() {
    window.addEventListener('popstate', (e) => {this.handleRoute(Router.home + window.location.search)});
    window.addEventListener('urlchange', (e) => {
      this.handleRoute(e.detail.url)
    });
  }

  async handleRoute(path) {
    const content = document.querySelector('#content');
    content.innerHTML = ''; // Clear content
    let route = Router.routes.get(path);
    console.log(Router.routes);
    if (route) {
      content.innerHTML = '<div class="loader"></div>'
      await route.handler(route.params);
    } else {
      content.innerHTML = '<h1>404 - Page Not Found</h1>';
    }
  }
}

export const router = Router.getInstance();
