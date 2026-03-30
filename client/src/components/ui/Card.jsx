/**
 * Card — reusable card wrapper with consistent styling.
 *
 * @param {string} className — additional classes
 * @param {object} style — additional inline styles
 */
export default function Card({ children, className = '', style = {}, ...props }) {
  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-200 ${className}`}
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-md)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
