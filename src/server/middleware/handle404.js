import log from '../log';

export default function handle404(context, response) {
  log.info('404', `no handler specified for path ${context.pathname}`);
  response.writeHead(404);
  response.end();
}