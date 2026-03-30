import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import { testAPIEndpoint } from '../services/api';

/**
 * APITester page — send HTTP requests to any endpoint.
 * Placeholder: sends request details to backend, displays mock response.
 */

const HTTP_METHODS = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'PATCH', label: 'PATCH' },
  { value: 'DELETE', label: 'DELETE' },
];

export default function APITester() {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState('');
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
      const data = await testAPIEndpoint({ url, method, body });
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
      <div className="pt-4">
        <h1 className="text-2xl lg:text-3xl font-extrabold mb-3" style={{ color: 'var(--color-text)' }}>
          API Tester
        </h1>
        <p className="text-sm lg:text-base max-w-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          Send HTTP requests to any endpoint and inspect the response.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                <Select
                  id="method-select"
                  label="Method"
                  options={HTTP_METHODS}
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                />
                <div className="flex-1">
                  <Textarea
                    id="api-url-input"
                    label="URL"
                    placeholder="https://api.example.com/endpoint"
                    rows={2}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>

              <Textarea
                id="api-body-input"
                label="Request Body (optional)"
                placeholder='{"key": "value"}'
                rows={6}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
          </Card>

          <Card>
            <Button
              id="send-button"
              variant="primary"
              onClick={handleRun}
              loading={loading}
              disabled={!url.trim()}
            >
              {loading ? 'Sending...' : '🚀 Send Request'}
            </Button>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="flex-1 min-h-[460px] flex flex-col">
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--color-text-secondary)' }}>
              Response
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
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                  Response will appear here
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
