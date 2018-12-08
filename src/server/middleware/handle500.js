import log from '../log';

export default function handle500(context, response, next, error) {
  log.error('500', `error for route ${context.pathname}`, error);
  response.writeHead(500);
  response.end();
}