import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import CopyButton from '../components/ui/CopyButton';
import SaveToVaultButton from '../components/ui/SaveToVaultButton';
import axios from 'axios';

const HASH_TYPES = [
  { value: 'uuid', label: 'UUID (v4)' },
  { value: 'md5', label: 'MD5 Hash' },
  { value: 'sha1', label: 'SHA-1 Hash' },
  { value: 'sha256', label: 'SHA-256 Hash' },
  { value: 'sha512', label: 'SHA-512 Hash' },
];

export default function UUIDHashGen() {
  const [type, setType] = useState('uuid');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRun = async () => {
    if (type !== 'uuid' && !input.trim()) {
      setError('Please enter some text to hash.');
      return;
    }

    setError('');
    setResult('');
    setLoading(true);

    try {
      const res = await axios.post('/api/hash', { type, input });
      if (res.data.success) {
        setResult(res.data.data);
      } else {
        setError(res.data.error || 'Failed to generate hash/uuid');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Server error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="pt-2">
        <h1 className="text-2xl lg:text-3xl font-extrabold mb-3" style={{ color: '#ffffff' }}>
          UUID & Hash Generator
        </h1>
        <p className="text-sm lg:text-base max-w-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          Generate random UUIDs or calculate cryptographic hashes from text.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <div className="flex flex-col gap-5">
              <Select
                id="type-select"
                label="Generator Type"
                options={HASH_TYPES}
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              {type !== 'uuid' && (
                <Textarea
                  id="hash-input"
                  label="Input Text"
                  placeholder="Enter text to hash..."
                  rows={4}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              )}
            </div>
          </Card>

          <Card>
            <Button
              id="generate-button"
              variant="primary"
              onClick={handleRun}
              loading={loading}
              disabled={type !== 'uuid' && !input.trim()}
            >
              {loading ? 'Generating...' : `Generate ${type.toUpperCase()}`}
            </Button>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="flex-1 min-h-[300px] flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>
                Result
              </h2>
              {result && (
                <div className="flex gap-2">
                  <SaveToVaultButton 
                    title={`${type.toUpperCase()} Generator`} 
                    content={result} 
                    language="plaintext" 
                    tags={['hash', 'uuid', type]} 
                  />
                  <CopyButton text={result} />
                </div>
              )}
            </div>

            {error && (
              <div className="p-4 rounded-xl text-sm animate-fade-in mb-4 bg-red-500/10 border border-red-500/30 text-red-400">
                ⚠ {error}
              </div>
            )}

            {result && !loading && (
              <div className="flex-1 p-5 rounded-xl overflow-auto text-sm leading-relaxed whitespace-pre-wrap font-mono animate-fade-in bg-black/30 text-[var(--color-code-text)] border border-white/5 flex items-center justify-center break-all">
                <span className="text-xl">{result}</span>
              </div>
            )}

            {!result && !loading && !error && (
              <div className="flex-1 flex flex-col items-center justify-center opacity-30">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                  Result will appear here
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
