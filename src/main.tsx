import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import { RouterProvider } from 'react-router';
import { router } from './constants/routes.tsx';
import { ApolloProvider } from '@apollo/client';
import client from './lib/apollo/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
