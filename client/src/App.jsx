import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import AiExplainer from './pages/AiExplainer';

/**
 * App — root component.
 * Wraps everything in ThemeProvider and sets up routing.
 */
export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ai-explainer" element={<AiExplainer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
