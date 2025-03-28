import '@ui/assets/styles/index.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { makeServer } from './infraestructure/mirage/server.ts';
import { EnvConfig } from './configs/env.config.ts';
import App from './App.tsx';

const queryClient = new QueryClient();
const { environment } = EnvConfig();

if (environment === 'development') {
  makeServer();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
