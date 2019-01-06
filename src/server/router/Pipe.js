import Router from './Router';
import setImmediatePromise from '../utils/setImmediatePromise';

export default class Pipe {
  constructor(layers, context, request, response, next = null) {
    this.layers = layers;
    this.context = context;
    this.request = request;
    this.response = response;
    this.out = next;
    this.currentLayer = 0;
    this.next = this.next.bind(this);
  }

  async exitCurrentPipe(error) {
    if (this.out) {
      await this.out(error);
    } else {
      throw error || new Error(`no layer found for ${this.context.location.pathname}`);
    }
  }

  async enterNewPipe(router, error) {
    const pipe = new Pipe(router.layers, this.context, this.request, this.response, this.next);
    await pipe.next(error);
  }

  async handlePipeError(layer, error) {
    if (layer.handler.length >= 5) {
      await layer.handler(this.context, this.request, this.response, this.next, error);
    } else {
      await this.next(error);
    }
  }

  async next(error) {
    await setImmediatePromise();
    const layer = this.layers[this.currentLayer++];

    if (!layer) {
      await this.exitCurrentPipe(error);
      return;
    }

    try {
      if (layer instanceof Router) {
        await this.enterNewPipe(layer, error);
        return;
      }

      if (error) {
        await this.handlePipeError(layer, error);
        return;
      }

      if (!layer.match(this.context)) {
        await this.next(error);
        return;
      }

      await layer.handler(this.context, this.request, this.response, this.next)
    } catch (ex) {
      await this.next(ex);
    }
  }
}