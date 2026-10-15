import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ToastProvider } from './context/ToastContext';
import { AdminProvider } from './context/AdminContext';

createRoot(document.getElementById('root')!).render(
  <ToastProvider>
    <AdminProvider>
      <App />
    </AdminProvider>
  </ToastProvider>
);
