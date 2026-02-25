import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';

const rootRoute = createRootRoute();

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quiz',
  component: QuizPage,
});

const routeTree = rootRoute.addChildren([homeRoute, quizRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
