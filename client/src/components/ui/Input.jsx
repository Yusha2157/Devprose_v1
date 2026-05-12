/**
 * Input — reusable text input with consistent dark styling.
 * Height: h-11, matching Button and Select components.
 *
 * Props:
 *  - label: optional label text
 *  - id: input id (also used for htmlFor)
 *  - icon: optional leading icon (React node)
 */
export default function Input({ label, id, icon, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {icon}
          </span>
        )}
        <input
          id={id}
          className={`w-full h-11 ${icon ? 'pl-10' : 'pl-4'} pr-4 rounded-lg text-sm font-medium outline-none transition-all duration-200 ${className}`}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            color: 'var(--color-text)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
          {...props}
        />
      </div>
    </div>
  );
}
