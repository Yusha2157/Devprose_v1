import { useState, useEffect, useMemo } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';

/**
 * SnippetManager — save, organize, search, and copy reusable code snippets.
 * All data persisted to localStorage.
 */

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'sql', label: 'SQL' },
  { value: 'bash', label: 'Bash' },
  { value: 'json', label: 'JSON' },
  { value: 'other', label: 'Other' },
];

const LANG_BADGE_VARIANT = {
  javascript: 'warning',
  typescript: 'primary',
  python: 'success',
  java: 'danger',
  cpp: 'cyan',
  csharp: 'purple',
  go: 'cyan',
  rust: 'danger',
  html: 'warning',
  css: 'primary',
  sql: 'success',
  bash: 'default',
  json: 'purple',
  other: 'default',
};

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'alpha', label: 'A → Z' },
  { value: 'alpha-desc', label: 'Z → A' },
];

const STORAGE_KEY = 'devprose-snippets';

function loadSnippets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveSnippets(snippets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// --- Icons ---
const SearchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CopyIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

const EditIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
  </svg>
);

const PlusIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// --- Empty State ---
function EmptyState({ onCreateClick }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
        style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px dashed rgba(59, 130, 246, 0.3)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#3b82f6' }}>
          <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">No snippets yet</h3>
      <p className="text-sm mb-6 max-w-xs text-center" style={{ color: 'var(--color-text-secondary)' }}>
        Start building your personal code library. Save reusable snippets for quick access.
      </p>
      <Button variant="primary" onClick={onCreateClick} id="empty-create-btn">
        {PlusIcon} Create First Snippet
      </Button>
    </div>
  );
}

// --- Toast ---
function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="toast flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
      {message}
    </div>
  );
}

// --- Snippet Card ---
function SnippetCard({ snippet, onCopy, onEdit, onDelete }) {
  const langLabel = LANGUAGES.find(l => l.value === snippet.language)?.label || snippet.language;
  const badgeVariant = LANG_BADGE_VARIANT[snippet.language] || 'default';
  const dateStr = new Date(snippet.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const codeLines = snippet.code.split('\n').slice(0, 5).join('\n');

  return (
    <Card className="flex flex-col gap-4 animate-fade-in" hover>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-white truncate">{snippet.title}</h3>
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{dateStr}</span>
          </div>
        </div>
        <Badge variant={badgeVariant}>{langLabel}</Badge>
      </div>

      {/* Code Preview */}
      <div className="code-preview p-3 max-h-[120px] overflow-hidden text-xs">
        {codeLines}
      </div>

      {/* Tags */}
      {snippet.tags && snippet.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {snippet.tags.map(tag => (
            <span key={tag} className="text-[11px] px-2 py-0.5 rounded font-medium"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'var(--color-text-secondary)' }}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      {snippet.description && (
        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
          {snippet.description}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Button size="sm" variant="secondary" onClick={() => onCopy(snippet)} id={`copy-${snippet.id}`}>
          {CopyIcon} Copy
        </Button>
        <Button size="sm" variant="ghost" onClick={() => onEdit(snippet)} id={`edit-${snippet.id}`}>
          {EditIcon} Edit
        </Button>
        <div className="ml-auto">
          <Button size="icon" variant="danger" onClick={() => onDelete(snippet.id)} id={`delete-${snippet.id}`}>
            {TrashIcon}
          </Button>
        </div>
      </div>
    </Card>
  );
}

// --- Create / Edit Form ---
function SnippetForm({ snippet, onSave, onCancel }) {
  const [title, setTitle] = useState(snippet?.title || '');
  const [language, setLanguage] = useState(snippet?.language || 'javascript');
  const [tagsInput, setTagsInput] = useState(snippet?.tags?.join(', ') || '');
  const [code, setCode] = useState(snippet?.code || '');
  const [description, setDescription] = useState(snippet?.description || '');

  const handleSubmit = () => {
    if (!title.trim() || !code.trim()) return;
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    onSave({
      id: snippet?.id || generateId(),
      title: title.trim(),
      language,
      tags,
      code,
      description: description.trim(),
      createdAt: snippet?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <Input id="snippet-title" label="Title" placeholder="e.g. React useDebounce Hook" value={title} onChange={e => setTitle(e.target.value)} />
      <Select id="snippet-lang" label="Language" options={LANGUAGES} value={language} onChange={e => setLanguage(e.target.value)} />
      <Input id="snippet-tags" label="Tags (comma-separated)" placeholder="e.g. react, hooks, utility" value={tagsInput} onChange={e => setTagsInput(e.target.value)} />
      <Textarea id="snippet-code" label="Code" placeholder="// Paste your code here..." rows={10} value={code} onChange={e => setCode(e.target.value)} />
      <Textarea id="snippet-desc" label="Description (optional)" placeholder="What does this snippet do?" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
      <div className="flex items-center gap-3 pt-2">
        <Button variant="primary" onClick={handleSubmit} disabled={!title.trim() || !code.trim()} id="save-snippet-btn">
          {snippet?.id ? 'Update Snippet' : 'Save Snippet'}
        </Button>
        <Button variant="secondary" onClick={onCancel} id="cancel-snippet-btn">
          Cancel
        </Button>
      </div>
    </div>
  );
}

// --- Main Page ---
export default function SnippetManager() {
  const [snippets, setSnippets] = useState(loadSnippets);
  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => { saveSnippets(snippets); }, [snippets]);

  const filtered = useMemo(() => {
    let list = [...snippets];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.tags?.some(t => t.toLowerCase().includes(q))
      );
    }
    if (langFilter !== 'all') list = list.filter(s => s.language === langFilter);
    list.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'alpha') return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });
    return list;
  }, [snippets, search, langFilter, sortBy]);

  const handleSave = (snippet) => {
    setSnippets(prev => {
      const idx = prev.findIndex(s => s.id === snippet.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = snippet; return next; }
      return [snippet, ...prev];
    });
    setModalOpen(false);
    setEditingSnippet(null);
    setToast(editingSnippet ? 'Snippet updated!' : 'Snippet saved!');
  };

  const handleDelete = (id) => {
    setSnippets(prev => prev.filter(s => s.id !== id));
    setToast('Snippet deleted');
  };

  const handleCopy = (snippet) => {
    navigator.clipboard.writeText(snippet.code);
    setToast('Copied to clipboard!');
  };

  const openCreate = () => { setEditingSnippet(null); setModalOpen(true); };
  const openEdit = (s) => { setEditingSnippet(s); setModalOpen(true); };

  const filterLangs = [{ value: 'all', label: 'All Languages' }, ...LANGUAGES];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold mb-2" style={{ color: '#ffffff' }}>
            Snippet Manager
          </h1>
          <p className="text-sm lg:text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            Save, organize, and quickly access your reusable code snippets.
          </p>
        </div>
        {snippets.length > 0 && (
          <Button variant="primary" onClick={openCreate} id="create-snippet-btn">
            {PlusIcon} New Snippet
          </Button>
        )}
      </div>

      {/* Search + Filters */}
      {snippets.length > 0 && (
        <Card>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
            <div className="flex-1">
              <Input id="snippet-search" placeholder="Search snippets..." icon={SearchIcon} value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select id="lang-filter" options={filterLangs} value={langFilter} onChange={e => setLangFilter(e.target.value)} />
            <Select id="sort-filter" options={SORT_OPTIONS} value={sortBy} onChange={e => setSortBy(e.target.value)} />
          </div>
        </Card>
      )}

      {/* Content */}
      {snippets.length === 0 ? (
        <EmptyState onCreateClick={openCreate} />
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>No matching snippets</p>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(s => (
            <SnippetCard key={s.id} snippet={s} onCopy={handleCopy} onEdit={openEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditingSnippet(null); }} title={editingSnippet ? 'Edit Snippet' : 'Create Snippet'} maxWidth="max-w-xl">
        <SnippetForm snippet={editingSnippet} onSave={handleSave} onCancel={() => { setModalOpen(false); setEditingSnippet(null); }} />
      </Modal>

      {/* Toast */}
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
    </div>
  );
}
