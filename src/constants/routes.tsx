import { createBrowserRouter } from 'react-router';

import { LayoutApp } from '../components/base-layout';
import { AuthPage } from '../pages/auth';
import { ExpensePage } from '../pages/expense';
import { HomePage } from '../pages/home';
import { IncomePage } from '../pages/income';
import { NotFoundPage } from '../pages/not-found';
import { ROUTE_PATHS } from './route-path';

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.home,
    element: <LayoutApp />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTE_PATHS.income,
        element: <IncomePage />,
      },
      {
        path: ROUTE_PATHS.expense,
        element: <ExpensePage />,
      },
    ],
  },
  { path: ROUTE_PATHS.auth, element: <AuthPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
