/**
 * Select — reusable dropdown select component.
 *
 * @param {string} label — label text
 * @param {Array} options — [{ value, label }]
 * @param {string} value — controlled value
 * @param {function} onChange
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
          backgroundColor: 'var(--color-surface-alt)',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)',
        }}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
