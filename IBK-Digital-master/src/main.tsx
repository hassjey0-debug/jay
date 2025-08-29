import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import Entertainment from './pages/Entertainment';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/entertainment" element={<Entertainment />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
