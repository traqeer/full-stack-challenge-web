import { index, route, type RouteConfig } from '@react-router/dev/routes';

// Register application routes here. When adding a new page, add it to this list.
export default [
  index('routes/index.tsx'),
  route('/todos', 'routes/todos/route.tsx'),
] satisfies RouteConfig;
