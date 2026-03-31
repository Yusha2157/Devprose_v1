/**
 * Select — reusable dropdown with dark glassmorphic styling.
 */
export default function Select({ label, options = [], value, onChange, id, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
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
        className="px-3 py-2.5 rounded-xl text-sm font-medium outline-none transition-all duration-200 cursor-pointer appearance-none"
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
