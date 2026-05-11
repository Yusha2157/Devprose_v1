import { useEffect, useCallback } from 'react';

/**
 * Modal — reusable modal overlay with animated enter, close on Escape / backdrop click.
 *
 * Props:
 *  - isOpen: boolean
 *  - onClose: () => void
 *  - title: string (optional header)
 *  - maxWidth: string (default 'max-w-lg')
 *  - children: modal body content
 */
export default function Modal({ isOpen, onClose, title, maxWidth = 'max-w-lg', children }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content w-full ${maxWidth} mx-4 rounded-2xl p-6 flex flex-col gap-6`}
        style={{
          background: '#111827',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div
            className="flex items-center justify-between pb-4"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}
          >
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="h-9 w-9 rounded-lg flex items-center justify-center transition-colors duration-200 cursor-pointer"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                color: 'var(--color-text-secondary)',
                border: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)')}
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        {children}
      </div>
    </div>
  );
}
