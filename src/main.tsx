import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CurriculumProvider } from './context/CurriculumContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurriculumProvider>
      <App />
    </CurriculumProvider>
  </StrictMode>,
);
