import express from 'express';
import config from '../config';
import authRouter from '../modules/authModule/auth.route';
import bookRouter from '../modules/bookModule/book.route';
const router = express.Router();
const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter.authRouter,
  },
  {
    path: '/book',
    route: bookRouter.bookRouter,
  },
];
defaultRoutes.forEach(route => {
  const apis = route.route.stack.map(path => {
    return { path: path.route.path, methods: path.route.methods };
  });
  apis.map(api => {
    console.log([
      api.methods,
      { route: `${config.api_route}${route.path}${api.path}` },
    ]);
  });
  router.use(route.path, route.route);
});

export default router;
