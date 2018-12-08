import log from '../log';
import memory from '../utils/memory';

export default class ClientResponse {
  constructor(response, context) {
    this.response = response;
    this.context = context;
    this.start = Date.now();
    log.info('request', `[${context.id}] ${context.method} ${context.pathname}`);
  }

  writeHead(...args) {
    this.response.writeHead.apply(this.response, args);
  }

  end(...args) {
    const passThroughArgs = args.length ? args : [JSON.stringify({})];
    const { id, method, pathname } = this.context;
    const { end, statusCode } = this.response;
    end.apply(this.response, passThroughArgs);
    log.info('request', `[${id}] ${statusCode} ${method} ${pathname} ${Date.now() - this.start}ms`);
    log.info('memory', JSON.stringify(memory()));
  }

}