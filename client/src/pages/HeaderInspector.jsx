import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Textarea from '../components/ui/Textarea';
import { inspectHeaders } from '../services/api';

/**
 * HeaderInspector page — inspect HTTP response headers for any URL.
 * Placeholder: sends URL to backend, displays mock response.
 */
export default function HeaderInspector() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRun = async () => {
    if (!url.trim()) {
      setError('Please enter a URL.');
      return;
    }

    setError('');
    setResult('');
    setLoading(true);

    try {
      const data = await inspectHeaders({ url });
      if (data.success) {
        setResult(data.message);
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
          HTTP Header Inspector
        </h1>
        <p className="text-sm lg:text-base max-w-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          Enter a URL to inspect its HTTP response headers.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left panel — Input */}
        <div className="flex flex-col gap-6">
          <Card>
            <Textarea
              id="url-input"
              label="URL"
              placeholder="https://example.com"
              rows={3}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Card>

          <Card>
            <Button
              id="inspect-button"
              variant="primary"
              onClick={handleRun}
              loading={loading}
              disabled={!url.trim()}
            >
              {loading ? 'Inspecting...' : '🔍 Inspect Headers'}
            </Button>
          </Card>
        </div>

        {/* Right panel — Output */}
        <div className="flex flex-col gap-6">
          <Card className="flex-1 min-h-[300px] flex flex-col">
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--color-text-secondary)' }}>
              Output
            </h2>

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

            {!result && !loading && !error && (
              <div className="flex-1 flex flex-col items-center justify-center opacity-30">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                  Headers will appear here
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
