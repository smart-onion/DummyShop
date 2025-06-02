class Route{
  constructor(handler, params) {
    this.handler = handler;
    this.params = params || {};
  }
}

class Router {
  static home = window.location.pathname;
  constructor() {
      this.routes = new Map();
      this.bindEvents();
  }

   addRoute(path, handler, params) {
    let route = new Route(handler, params);
     this.routes.set(path, route);
  }

   navigate(url, params) {
    history.pushState(null, '', url);
    window.dispatchEvent(new CustomEvent('urlchange', { detail: { url: url} }));
  }

  // Bind event listeners for URL changes
  bindEvents() {
    window.addEventListener('popstate', (e) => {this.handleRoute(Router.home + window.location.search)});
    window.addEventListener('urlchange', (e) => this.handleRoute(e.detail.url));
  }

   async handleRoute(path) {
    const content = document.querySelector('#content');
    content.innerHTML = ''; // Clear content
    let route = this.routes.get(path);
    await route.handler(route.params);
  }
}

export const router = () =>  new Router();
