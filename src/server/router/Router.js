import Layer from './Layer';

export default class Router {
  constructor() {
    this.layers = [];
  }

  use(handler) {
    const routerOrLayer = handler instanceof Router ? handler : new Layer(null, null, handler);
    this.layers.push(routerOrLayer);
  }

  get(path, handler) {
    this.layers.push(new Layer('get', path, handler));
  }

  post(path, handler) {
    this.layers.push(new Layer('post', path, handler));
  }

  delete(path, handler) {
    this.layers.push(new Layer('delete', path, handler));
  }
}