import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Textarea from '../components/ui/Textarea';
import { formatJSONApi } from '../services/api';

/**
 * JSONFormatter page — paste JSON to format, validate, and minify.
 */
export default function JSONFormatter() {
  const [json, setJson] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRun = async () => {
    if (!json.trim()) {
      setError('Please paste some JSON.');
      return;
    }

    setError('');
    setResult('');
    setLoading(true);

    try {
      const data = await formatJSONApi({ json });
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
      <div className="pt-2">
        <h1 className="text-2xl lg:text-3xl font-extrabold mb-3" style={{ color: '#ffffff' }}>
          JSON Formatter
        </h1>
        <p className="text-sm lg:text-base max-w-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          Paste raw JSON to format, validate, or minify.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <Textarea
              id="json-input"
              label="Raw JSON"
              placeholder='{"key": "value", "nested": {"a": 1}}'
              rows={14}
              value={json}
              onChange={(e) => setJson(e.target.value)}
            />
          </Card>

          <Card>
            <Button
              id="format-button"
              variant="primary"
              onClick={handleRun}
              loading={loading}
              disabled={!json.trim()}
            >
              {loading ? 'Formatting...' : '✨ Format JSON'}
            </Button>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="flex-1 min-h-[460px] flex flex-col">
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--color-text-secondary)' }}>
              Formatted Output
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
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  color: 'var(--color-code-text)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
                id="output-panel"
              >
                {result}
              </div>
            )}

            {!result && !loading && !error && (
              <div className="flex-1 flex flex-col items-center justify-center opacity-30">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                  Formatted JSON will appear here
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
