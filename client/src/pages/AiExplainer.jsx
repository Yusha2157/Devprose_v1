import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import { explainCode } from '../services/api';

/**
 * AI Code Explainer page — the core feature.
 * Allows users to paste code, select language & mode, and get AI analysis.
 */

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
];

const MODES = [
  {
    value: 'explain',
    label: 'Explain',
    description: 'Get a clear, line-by-line explanation',
    icon: '💡',
  },
  {
    value: 'debug',
    label: 'Debug',
    description: 'Find bugs and potential issues',
    icon: '🐛',
  },
  {
    value: 'optimize',
    label: 'Optimize',
    description: 'Get performance improvement tips',
    icon: '⚡',
  },
];

export default function AiExplainer() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [mode, setMode] = useState('explain');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRun = async () => {
    if (!code.trim()) {
      setError('Please paste some code first.');
      return;
    }

    setError('');
    setResult('');
    setLoading(true);

    try {
      const data = await explainCode({ code, language, mode });
      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.message ||
        'Failed to connect to the server.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="pt-4">
        <h1 className="text-2xl lg:text-3xl font-extrabold mb-3" style={{ color: 'var(--color-text)' }}>
          AI Code Explainer
        </h1>
        <p className="text-sm lg:text-base max-w-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          Paste your code below, pick a language and mode, then hit Run.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left panel — Input */}
        <div className="flex flex-col gap-6">
          <Card>
            <Textarea
              id="code-input"
              label="Your Code"
              placeholder="// Paste your code here..."
              rows={14}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Card>

          <Card>
            <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-end">
              <Select
                id="language-select"
                label="Language"
                options={LANGUAGES}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />

              {/* Mode selector — pill buttons */}
              <div className="flex flex-col gap-2">
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Mode
                </span>
                <div
                  className="flex rounded-xl overflow-hidden"
                  style={{
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface-alt)',
                  }}
                >
                  {MODES.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setMode(m.value)}
                      className="px-5 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer"
                      style={{
                        backgroundColor: mode === m.value ? 'var(--color-primary)' : 'transparent',
                        color: mode === m.value ? '#fff' : 'var(--color-text-secondary)',
                      }}
                      title={m.description}
                      id={`mode-${m.value}`}
                    >
                      {m.icon} {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm:ml-auto">
                <Button
                  id="run-button"
                  variant="primary"
                  onClick={handleRun}
                  loading={loading}
                  disabled={!code.trim()}
                >
                  {loading ? 'Analyzing...' : '▶ Run'}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right panel — Output */}
        <div className="flex flex-col gap-6">
          <Card className="flex-1 min-h-[460px] flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>
                Output
              </h2>
              {result && (
                <button
                  onClick={() => navigator.clipboard.writeText(result)}
                  className="text-xs px-3 py-1.5 rounded-lg transition-colors duration-200 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--color-surface-alt)',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                  }}
                  id="copy-output"
                >
                  📋 Copy
                </button>
              )}
            </div>

            {/* Error state */}
            {error && (
              <div
                className="p-4 rounded-xl text-sm animate-fade-in mb-4"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: 'var(--color-danger)',
                }}
              >
                ⚠ {error}
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  AI is analyzing your code...
                </p>
                <style>{`
                  @keyframes pulse {
                    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
                    40% { transform: scale(1); opacity: 1; }
                  }
                `}</style>
              </div>
            )}

            {/* Result state */}
            {result && !loading && (
              <div
                className="flex-1 p-5 rounded-xl overflow-auto text-sm leading-relaxed whitespace-pre-wrap font-mono animate-fade-in"
                style={{
                  backgroundColor: 'var(--color-code-bg)',
                  color: 'var(--color-code-text)',
                  border: '1px solid var(--color-border)',
                }}
                id="output-panel"
              >
                {result}
              </div>
            )}

            {/* Empty state */}
            {!result && !loading && !error && (
              <div className="flex-1 flex flex-col items-center justify-center opacity-30">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                  Output will appear here
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
