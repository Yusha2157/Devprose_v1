/**
 * Card — reusable glassmorphic card wrapper.
 * Matches the reference dashboard's translucent dark card style.
 */
export default function Card({ children, className = '', style = {}, ...props }) {
  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-200 ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
