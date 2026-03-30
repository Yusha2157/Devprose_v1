import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Textarea from '../components/ui/Textarea';
import { testRegexApi } from '../services/api';

/**
 * RegexTester page — test regex patterns against input strings.
 * Placeholder: sends pattern + string to backend, displays mock response.
 */
export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRun = async () => {
    if (!pattern.trim()) {
      setError('Please enter a regex pattern.');
      return;
    }

    setError('');
    setResult('');
    setLoading(true);

    try {
      const data = await testRegexApi({ pattern, testString, flags: 'g' });
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
          Regex Tester
        </h1>
        <p className="text-sm lg:text-base max-w-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          Enter a regex pattern and test string to find matches.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <Textarea
              id="regex-input"
              label="Regex Pattern"
              placeholder="/your-pattern-here/g"
              rows={3}
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
            />
          </Card>

          <Card>
            <Textarea
              id="test-string-input"
              label="Test String"
              placeholder="Enter text to test against..."
              rows={6}
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
            />
          </Card>

          <Card>
            <Button
              id="regex-button"
              variant="primary"
              onClick={handleRun}
              loading={loading}
              disabled={!pattern.trim()}
            >
              {loading ? 'Testing...' : '🔎 Test Regex'}
            </Button>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="flex-1 min-h-[300px] flex flex-col">
            <h2 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--color-text-secondary)' }}>
              Matches
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
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                  Match results will appear here
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
