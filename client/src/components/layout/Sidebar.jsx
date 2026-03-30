import { NavLink } from 'react-router-dom';

/**
 * Sidebar navigation — lists all available dev tools.
 * Designed to scale as new tools are added.
 *
 * Desktop: renders inline as a static column (not fixed) so it participates in flex layout.
 * Mobile: slides in as a fixed overlay with backdrop.
 */

const tools = [
  {
    name: 'Dashboard',
    path: '/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    name: 'AI Code Explainer',
    path: '/ai-explainer',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64
          transition-transform duration-300 ease-in-out
          lg:sticky lg:top-0 lg:h-[calc(100vh-4rem)] lg:z-auto lg:translate-x-0 lg:shrink-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          backgroundColor: 'var(--color-sidebar)',
          borderRight: '1px solid var(--color-border)',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Nav links */}
          <div className="p-6 flex-1">
            <p
              className="text-[11px] font-semibold uppercase tracking-widest mb-5 px-3"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Tools
            </p>

            <nav className="flex flex-col gap-2">
              {tools.map((tool) => (
                <NavLink
                  key={tool.path}
                  to={tool.path}
                  onClick={onClose}
                  end={tool.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                     transition-all duration-200 group
                     ${isActive ? 'text-white' : 'hover:translate-x-0.5'}`
                  }
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--color-text-secondary)',
                  })}
                >
                  <span className="transition-transform duration-200 group-hover:scale-110">
                    {tool.icon}
                  </span>
                  {tool.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Bottom branding */}
          <div
            className="p-5 border-t text-center"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              DevProse v1.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
