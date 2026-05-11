import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Textarea from '../components/ui/Textarea';
import CopyButton from '../components/ui/CopyButton';
import SaveToVaultButton from '../components/ui/SaveToVaultButton';
import axios from 'axios';

export default function CronBuilder() {
  const [expression, setExpression] = useState('0 0 * * *');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExplain = async () => {
    if (!expression.trim()) {
      setError('Please enter a cron expression.');
      return;
    }

    setError('');
    setExplanation('');
    setLoading(true);

    try {
      const res = await axios.post('/api/cron/explain', { expression });
      if (res.data.success) {
        setExplanation(res.data.data);
      } else {
        setError(res.data.error || 'Failed to explain cron');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid cron expression');
    } finally {
      setLoading(false);
    }
  };

  const templates = [
    { label: 'Every minute', expr: '* * * * *' },
    { label: 'Every 5 minutes', expr: '*/5 * * * *' },
    { label: 'Every hour', expr: '0 * * * *' },
    { label: 'Every day at midnight', expr: '0 0 * * *' },
    { label: 'Every Sunday at midnight', expr: '0 0 * * 0' },
  ];

  return (
    <div className="space-y-8">
      <div className="pt-2">
        <h1 className="text-2xl lg:text-3xl font-extrabold mb-3 text-white">
          Cron Expression Explainer
        </h1>
        <p className="text-sm lg:text-base max-w-lg leading-relaxed text-[var(--color-text-secondary)]">
          Convert complex cron expressions into human-readable text.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <div className="flex flex-col gap-5">
              <Textarea
                id="cron-input"
                label="Cron Expression"
                placeholder="* * * * *"
                rows={2}
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {templates.map(t => (
                  <button
                    key={t.expr}
                    onClick={() => { setExpression(t.expr); setError(''); setExplanation(''); }}
                    className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/70 transition-colors"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <Button
              id="explain-button"
              variant="primary"
              onClick={handleExplain}
              loading={loading}
              disabled={!expression.trim()}
            >
              {loading ? 'Explaining...' : 'Explain Cron'}
            </Button>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="flex-1 min-h-[300px] flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Explanation
              </h2>
              {explanation && (
                <div className="flex gap-2">
                  <SaveToVaultButton 
                    title={`Cron: ${expression}`} 
                    content={`${expression}\n# ${explanation}`} 
                    language="plaintext" 
                    tags={['cron']} 
                  />
                  <CopyButton text={explanation} />
                </div>
              )}
            </div>

            {error && (
              <div className="p-4 rounded-xl text-sm animate-fade-in mb-4 bg-red-500/10 border border-red-500/30 text-red-400">
                ⚠ {error}
              </div>
            )}

            {explanation && !loading && (
              <div className="flex-1 p-5 rounded-xl overflow-auto text-sm leading-relaxed whitespace-pre-wrap font-sans font-medium text-lg animate-fade-in bg-black/30 text-[var(--color-code-text)] border border-white/5 flex items-center justify-center text-center">
                "{explanation}"
              </div>
            )}

            {!explanation && !loading && !error && (
              <div className="flex-1 flex flex-col items-center justify-center opacity-30">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                  Explanation will appear here
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
