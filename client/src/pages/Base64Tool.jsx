import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import CopyButton from '../components/ui/CopyButton';
import SaveToVaultButton from '../components/ui/SaveToVaultButton';

const MODES = [
  { value: 'encode', label: 'Encode to Base64' },
  { value: 'decode', label: 'Decode from Base64' },
];

export default function Base64Tool() {
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleRun = () => {
    if (!input) {
      setError('Input is required.');
      return;
    }
    setError('');
    
    try {
      if (mode === 'encode') {
        setResult(btoa(input));
      } else {
        setResult(atob(input));
      }
    } catch (e) {
      setError('Invalid input for Base64 operation.');
      setResult('');
    }
  };

  return (
    <div className="space-y-8">
      <div className="pt-2">
        <h1 className="text-2xl lg:text-3xl font-extrabold mb-3 text-white">
          Base64 Encoder/Decoder
        </h1>
        <p className="text-sm lg:text-base max-w-lg leading-relaxed text-[var(--color-text-secondary)]">
          Easily encode or decode Base64 strings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <div className="flex flex-col gap-5">
              <Select
                id="mode-select"
                label="Operation"
                options={MODES}
                value={mode}
                onChange={(e) => { setMode(e.target.value); setResult(''); setError(''); }}
              />
              <Textarea
                id="base64-input"
                label="Input"
                placeholder={mode === 'encode' ? 'Text to encode...' : 'Base64 to decode...'}
                rows={6}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </Card>
          <Card>
            <Button
              id="run-button"
              variant="primary"
              onClick={handleRun}
              disabled={!input}
            >
              {mode === 'encode' ? 'Encode' : 'Decode'}
            </Button>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="flex-1 min-h-[300px] flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Output
              </h2>
              {result && (
                <div className="flex gap-2">
                  <SaveToVaultButton 
                    title={`Base64 ${mode}`} 
                    content={result} 
                    language="plaintext" 
                    tags={['base64', mode]} 
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

            {result && (
              <div className="flex-1 p-5 rounded-xl overflow-auto text-sm leading-relaxed whitespace-pre-wrap font-mono animate-fade-in bg-black/30 text-[var(--color-code-text)] border border-white/5 break-all">
                {result}
              </div>
            )}

            {!result && !error && (
              <div className="flex-1 flex flex-col items-center justify-center opacity-30">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="M2 15h10"></path>
                  <path d="m9 18 3-3-3-3"></path>
                </svg>
                <p className="text-sm font-medium text-[var(--color-text-secondary)]">
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
