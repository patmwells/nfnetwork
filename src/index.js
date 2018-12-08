import '@babel/polyfill';
import Server from './server/Server';
import Db from './server/db/Db';
import App from './server/router/App';
import SessionService from './server/services/SessionService';
import UserService from './server/services/UserService';
import log from './server/log';

(function() {
  const db = new Db();
  const sessionService = new SessionService(db);
  const userService = new UserService(db);
  const services = {
    sessions: sessionService,
    users: userService,
  };
  const app = new App(services);
  const server = new Server(db, app);
  server.start().catch(error => log.error('startup', 'startup error', error));
})();