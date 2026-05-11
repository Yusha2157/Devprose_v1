import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import CopyButton from '../components/ui/CopyButton';
import axios from 'axios';

export default function Vault() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/vault');
      setSnippets(res.data.data);
    } catch (err) {
      setError('Failed to load snippets.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this snippet?')) return;
    try {
      await axios.delete(`/api/vault/${id}`);
      setSnippets(snippets.filter(s => s._id !== id));
    } catch (err) {
      alert('Failed to delete snippet.');
    }
  };

  const filteredSnippets = snippets.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold mb-3 flex items-center gap-2" style={{ color: '#ffffff' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Dev Snippets Vault
          </h1>
          <p className="text-sm lg:text-base max-w-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            Your saved API responses, regex patterns, and code snippets.
          </p>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search vault..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl border bg-black/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border-white/10 text-white placeholder-white/30"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-3 text-white/30" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 opacity-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl text-red-400 bg-red-900/20 border border-red-900/30">
          ⚠ {error}
        </div>
      ) : filteredSnippets.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 opacity-40 border border-dashed rounded-xl border-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <p>No snippets found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
          {filteredSnippets.map((snippet) => (
            <Card key={snippet._id} className="flex flex-col h-full max-h-[400px]">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-white mb-1">{snippet.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {snippet.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-white/10 text-white/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <CopyButton text={snippet.content} />
                  <button 
                    onClick={() => handleDelete(snippet._id)}
                    className="p-2 rounded-md hover:bg-red-500/20 text-red-400 transition-colors"
                    title="Delete snippet"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto mt-2 rounded-lg p-3 bg-black/40 border border-white/5 font-mono text-sm whitespace-pre-wrap text-[var(--color-code-text)]">
                {snippet.content}
              </div>
              <div className="mt-3 text-xs opacity-40 text-right">
                {new Date(snippet.createdAt).toLocaleString()}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
