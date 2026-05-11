/**
 * Button — reusable button with variants, sizes, and loading state.
 *
 * Sizes: 'default' (h-11), 'sm' (h-9), 'icon' (h-9 w-9)
 * Variants: 'primary', 'secondary', 'ghost', 'danger'
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'default',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const sizeStyles = {
    default: 'h-11 px-4 text-sm',
    sm: 'h-9 px-3 text-xs',
    icon: 'h-9 w-9 text-sm',
  };

  const baseStyles = `
    inline-flex items-center justify-center gap-2
    rounded-lg font-medium
    transition-all duration-200 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-[0.97]
    ${sizeStyles[size] || sizeStyles.default}
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
    danger: {
      backgroundColor: 'rgba(239, 68, 68, 0.15)',
      color: '#f87171',
      border: '1px solid rgba(239, 68, 68, 0.25)',
    },
  };

  const hoverBg = {
    primary: '#1d4ed8',
    secondary: 'rgba(255, 255, 255, 0.10)',
    ghost: 'rgba(255, 255, 255, 0.06)',
    danger: 'rgba(239, 68, 68, 0.25)',
  };

  const restoreBg = {
    primary: '#2563eb',
    secondary: 'rgba(255, 255, 255, 0.06)',
    ghost: 'transparent',
    danger: 'rgba(239, 68, 68, 0.15)',
  };

  return (
    <button
      className={`${baseStyles} ${className}`}
      style={variants[variant]}
      disabled={disabled || loading}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = hoverBg[variant];
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = restoreBg[variant];
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
