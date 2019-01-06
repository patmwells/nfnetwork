import http from 'http';
import Router from './Router';
import Context from './Context';
import Pipe from './Pipe';
import log from '../log';

export default class App extends Router {
  constructor(db) {
    super();
    this.db = db;
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

  async handler(request, response) {
    try {
      const context = new Context(request, this.db);
      const pipe = new Pipe(this.layers, context, request, response);
      await pipe.next();
    } catch (ex) {
      response.writeHead(500);
      response.end();
      log.error('app error', `unknown app error ${request.url}`, ex);
    }
  }
}