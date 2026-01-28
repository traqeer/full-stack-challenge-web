import { route, type RouteConfig } from '@react-router/dev/routes';

export default [
  route('/todos', 'routes/todos/route.tsx'),
  route('*', 'routes/index.tsx'),
] satisfies RouteConfig;
