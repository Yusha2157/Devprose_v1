/**
 * Card — reusable solid dark card wrapper.
 * Uses solid bg-[#111827] with subtle border — no glassmorphism.
 */
export default function Card({ children, className = '', style = {}, ...props }) {
  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-200 ${className}`}
      style={{
        background: '#111827',
        border: '1px solid rgba(255, 255, 255, 0.10)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
