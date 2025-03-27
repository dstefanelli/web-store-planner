import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@ui/assets/styles/index.scss';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
