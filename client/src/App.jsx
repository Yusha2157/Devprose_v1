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
import Vault from './pages/Vault';
import UUIDHashGen from './pages/UUIDHashGen';
import CronBuilder from './pages/CronBuilder';
import Base64Tool from './pages/Base64Tool';
import ColorPicker from './pages/ColorPicker';
import MarkdownPreview from './pages/MarkdownPreview';

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
            <Route path="/vault" element={<Vault />} />
            <Route path="/uuid-hash" element={<UUIDHashGen />} />
            <Route path="/cron-builder" element={<CronBuilder />} />
            <Route path="/base64" element={<Base64Tool />} />
            <Route path="/color-picker" element={<ColorPicker />} />
            <Route path="/markdown" element={<MarkdownPreview />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
