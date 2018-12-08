import Router from '../../router/Router';
import get from './get';
import post from './post';

export default function users() {
  const router = new Router();
  router.get('/users', get);
  router.post('/users', post);
  return router;
}