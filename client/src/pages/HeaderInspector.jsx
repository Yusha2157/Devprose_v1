import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Textarea from '../components/ui/Textarea';
import { inspectHeaders } from '../services/api';

/**
 * HeaderInspector page — inspect HTTP response headers for any URL.
 */
export default function HeaderInspector() {
  const [url, setUrl] = useState('');
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRun = async () => {
    if (!url.trim()) {
      setError('Please enter a URL.');
      return;
    }

    setError('');
    setHeaderData(null);
    setLoading(true);

    try {
      const data = await inspectHeaders({ url });
      if (data.success) {
        setHeaderData(data.data);
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
      <div className="pt-2">
        <h1 className="text-2xl lg:text-3xl font-extrabold mb-3" style={{ color: '#ffffff' }}>
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

            {headerData && !loading && (
              <div
                className="flex-1 p-5 rounded-xl overflow-auto text-sm animate-fade-in flex flex-col gap-4"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
                id="output-panel"
              >
                <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center gap-3">
                    <span 
                      className="px-2 py-1 rounded text-xs font-bold tracking-wider"
                      style={{ 
                        backgroundColor: headerData.status >= 200 && headerData.status < 300 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: headerData.status >= 200 && headerData.status < 300 ? '#4ade80' : '#f87171'
                      }}
                    >
                      {headerData.status}
                    </span>
                    <span className="font-semibold text-white">{headerData.statusText || 'OK'}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  {Object.entries(headerData.headers || {}).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 p-2 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                      <span className="font-mono text-xs opacity-70 min-w-[140px]" style={{ color: '#60a5fa' }}>{key}</span>
                      <span className="font-mono text-sm text-gray-200 break-all">{value}</span>
                    </div>
                  ))}
                  
                  {(!headerData.headers || Object.keys(headerData.headers).length === 0) && (
                     <div className="text-xs opacity-50 italic" style={{ color: 'var(--color-text-secondary)' }}>No headers found.</div>
                  )}
                </div>
              </div>
            )}

            {!headerData && !loading && !error && (
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
