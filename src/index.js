import '@babel/polyfill';
import start from './server/Server';
import log from './server/log';

(async function() {
  try {
    await start();
  } catch (error) {
    log.error('startup', 'startup error', error);
    process.exit(0);
  }
})();