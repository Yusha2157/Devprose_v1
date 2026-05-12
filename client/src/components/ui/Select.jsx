/**
 * Select — reusable dropdown with consistent dark styling.
 * Height: h-11 to match Button and Input components.
 */
export default function Select({ label, options = [], value, onChange, id, className = '', ...props }) {
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
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`h-11 px-4 rounded-lg text-sm font-medium outline-none transition-all duration-200 cursor-pointer appearance-none ${className}`}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          color: 'var(--color-text)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ backgroundColor: '#1e293b' }}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
