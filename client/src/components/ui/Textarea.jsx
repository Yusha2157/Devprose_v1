/**
 * Textarea — reusable textarea with label, styled consistently.
 *
 * @param {string} label
 * @param {number} rows
 */
export default function Textarea({ label, id, rows = 8, ...props }) {
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
      <textarea
        id={id}
        rows={rows}
        className="px-4 py-3 rounded-xl text-sm font-mono outline-none resize-y transition-all duration-200"
        style={{
          backgroundColor: 'var(--color-code-bg)',
          color: 'var(--color-code-text)',
          border: '1px solid var(--color-border)',
          lineHeight: 1.6,
        }}
        {...props}
      />
    </div>
  );
}
