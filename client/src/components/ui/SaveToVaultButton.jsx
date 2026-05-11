import { useState } from 'react';
import axios from 'axios';

export default function SaveToVaultButton({ title, content, language = 'plaintext', tags = [], className = '' }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    setError('');
    try {
      await axios.post('/api/vault', { title, content, language, tags });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save to vault:', err);
      setError('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {error && <span className="text-red-500 text-xs">{error}</span>}
      <button
        onClick={handleSave}
        disabled={saving || saved || !content}
        className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center gap-1 ${
          saved
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 disabled:opacity-50'
        } ${className}`}
        title="Save to Dev Snippets Vault"
      >
        {saved ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Saved to Vault
          </>
        ) : saving ? (
          <span className="text-xs">Saving...</span>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Save to Vault
          </>
        )}
      </button>
    </div>
  );
}
