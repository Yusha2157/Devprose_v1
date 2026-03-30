import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import AiExplainer from './pages/AiExplainer';
import HeaderInspector from './pages/HeaderInspector';
import JWTTool from './pages/JWTTool';
import RegexTester from './pages/RegexTester';
import JSONFormatter from './pages/JSONFormatter';
import APITester from './pages/APITester';

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
            <Route path="/header-inspector" element={<HeaderInspector />} />
            <Route path="/jwt-tool" element={<JWTTool />} />
            <Route path="/regex-tester" element={<RegexTester />} />
            <Route path="/json-formatter" element={<JSONFormatter />} />
            <Route path="/api-tester" element={<APITester />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
