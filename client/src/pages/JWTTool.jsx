import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Textarea from '../components/ui/Textarea';
import { handleJWTApi } from '../services/api';

/**
 * JWTTool page — encode or decode JWT tokens.
 */
export default function JWTTool() {
  const [token, setToken] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRun = async () => {
    if (!token.trim()) {
      setError('Please enter a JWT token or payload.');
      return;
    }

    setError('');
    setResult('');
    setLoading(true);

    try {
      const data = await handleJWTApi({ token, action: 'decode' });
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
          JWT Encoder / Decoder
        </h1>
        <p className="text-sm lg:text-base max-w-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          Paste a JWT token to decode, or enter a payload to encode.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <Textarea
              id="jwt-input"
              label="JWT Token / Payload"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              rows={8}
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </Card>

          <Card>
            <Button
              id="jwt-button"
              variant="primary"
              onClick={handleRun}
              loading={loading}
              disabled={!token.trim()}
            >
              {loading ? 'Processing...' : '🔐 Decode JWT'}
            </Button>
          </Card>
        </div>

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
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                  Decoded output will appear here
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
