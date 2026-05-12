/**
 * Badge — small colored pill for language tags, status indicators, etc.
 *
 * Variants: 'default', 'primary', 'success', 'warning', 'danger'
 */
const variantStyles = {
  default: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    color: '#94a3b8',
    border: '1px solid rgba(255, 255, 255, 0.06)',
  },
  primary: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    color: '#60a5fa',
    border: '1px solid rgba(59, 130, 246, 0.2)',
  },
  success: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    color: '#34d399',
    border: '1px solid rgba(16, 185, 129, 0.2)',
  },
  warning: {
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    color: '#fbbf24',
    border: '1px solid rgba(251, 191, 36, 0.2)',
  },
  danger: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    color: '#f87171',
    border: '1px solid rgba(239, 68, 68, 0.2)',
  },
  purple: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    color: '#a78bfa',
    border: '1px solid rgba(139, 92, 246, 0.2)',
  },
  cyan: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    color: '#22d3ee',
    border: '1px solid rgba(6, 182, 212, 0.2)',
  },
};

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold tracking-wide ${className}`}
      style={variantStyles[variant] || variantStyles.default}
    >
      {children}
    </span>
  );
}
