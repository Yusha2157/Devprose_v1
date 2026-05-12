/**
 * Card — reusable solid dark card wrapper.
 * Uses solid bg-[#111827] with subtle border — no glassmorphism.
 *
 * Props:
 *  - hover: boolean — enable interactive hover glow + translate
 */
export default function Card({ children, className = '', hover = false, style = {}, ...props }) {
  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-200 ${hover ? 'hover:-translate-y-1' : ''} ${className}`}
      style={{
        background: '#111827',
        border: '1px solid rgba(255, 255, 255, 0.10)',
        ...style,
      }}
      onMouseEnter={hover ? (e) => {
        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.12)';
      } : undefined}
      onMouseLeave={hover ? (e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.10)';
        e.currentTarget.style.boxShadow = 'none';
      } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
