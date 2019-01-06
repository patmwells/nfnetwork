import Db from './db/Db';
import App from './router/App';

import users from './routes/users';
import handle404 from './middleware/handle404';
import handle500 from './middleware/handle500';

import log from './log';

/**
 * Profiling:
 *  ab -k -c 100 -n 2000 "http://localhost:8080/"
 */
export default async function start() {
  const start = Date.now();

  const db = new Db();
  log.info('startup', 'creating database');
  await db.create();
  log.info('startup', `created database ${db.name}`);

  log.info('startup', 'connecting to database');
  await db.connect();
  log.info('startup', `database connected ${db.host}:${db.port}`);

  log.info('startup', 'creating users table');
  await db.createUserTable();
  log.info('startup', 'created users table');

  const app = new App(db);

  app.use(users());
  app.use(handle404);
  app.use(handle500);

  log.info('startup', 'starting application server');
  await app.listen(8080);
  log.info('startup', `application server listening 8080`);
  log.info('startup', `took ${Date.now() - start}ms to startup`);
}
