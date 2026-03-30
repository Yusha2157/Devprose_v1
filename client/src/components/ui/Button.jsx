/**
 * Button — reusable button component with variants and loading state.
 *
 * @param {string} variant — 'primary' | 'secondary' | 'ghost'
 * @param {boolean} loading — shows spinner when true
 * @param {boolean} disabled
 * @param {string} className — additional classes
 */
export default function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    px-5 py-2.5 rounded-xl text-sm font-semibold
    transition-all duration-200 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-[0.97]
  `;

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))',
      color: '#fff',
      boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
    },
    secondary: {
      backgroundColor: 'var(--color-surface)',
      color: 'var(--color-text)',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-secondary)',
    },
  };

  return (
    <button
      className={`${baseStyles} ${className}`}
      style={variants[variant]}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
