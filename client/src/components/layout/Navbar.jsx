/**
 * Navbar — stripped down to mobile-only hamburger.
 * No visible header bar on desktop — sidebar handles all navigation.
 */
export default function Navbar({ onMenuToggle }) {
  return (
    <>
      {/* Mobile-only floating hamburger */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2.5 rounded-xl transition-all duration-200 cursor-pointer"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'var(--color-text)',
        }}
        aria-label="Toggle menu"
        id="menu-toggle"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </>
  );
}
