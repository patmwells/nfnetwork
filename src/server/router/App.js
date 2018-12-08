import http from 'http';
import Router from './Router';
import Context from './Context';
import ClientResponse from './ClientResponse';
import Pipe from './Pipe';
import log from '../log';

export default class App extends Router {
  constructor(services) {
    super();
    this.services = services;
    this.handler = this.handler.bind(this);
  }

  listen(port) {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.handler);
      server.on('listening', resolve);
      server.on('error', reject);
      server.listen(port)
    });
  }

  async handler(req, res) {
    const context = new Context(this.services);
    context.request(req);
    const response = new ClientResponse(res, context);
    try {
      const pipe = new Pipe(this.layers, context, response);
      await pipe.next();
    } catch (ex) {
      res.writeHead(500);
      res.end();
      log.error('app error', `unknown app error ${context.pathname}`, ex);
    }
  }
}