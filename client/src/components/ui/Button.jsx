/**
 * Button — reusable button with variants and loading state.
 * Fixed: consistent height (h-11), flex centering for text alignment.
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
    w-full h-11 flex items-center justify-center gap-2
    rounded-lg text-sm font-medium
    transition-all duration-200 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-[0.97]
  `;

  const variants = {
    primary: {
      backgroundColor: '#2563eb',
      color: '#fff',
      border: 'none',
    },
    secondary: {
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
      color: 'var(--color-text)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-secondary)',
      border: 'none',
    },
  };

  return (
    <button
      className={`${baseStyles} ${className}`}
      style={variants[variant]}
      disabled={disabled || loading}
      onMouseEnter={(e) => {
        if (variant === 'primary') e.currentTarget.style.backgroundColor = '#1d4ed8';
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') e.currentTarget.style.backgroundColor = '#2563eb';
      }}
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
