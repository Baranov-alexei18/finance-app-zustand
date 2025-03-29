import { createBrowserRouter } from 'react-router';
import { LayoutApp } from '../components/base-layout';
import { HomePage } from '../pages/home';
import { AuthPage } from '../pages/auth';
import { NotFoundPage } from '../pages/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutApp />,
    children: [{ index: true, element: <HomePage /> }],
  },
  { path: 'auth', element: <AuthPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
