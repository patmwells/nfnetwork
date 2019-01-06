import Router from '../../router/Router';
import get from './get';
import list from './list';
import post from './post';
import remove from './remove';

export default function users() {
  const router = new Router();
  router.get('/users/:id', get);
  router.get('/users', list);
  router.post('/users', post);
  router.delete('/users/:id', remove);
  return router;
}