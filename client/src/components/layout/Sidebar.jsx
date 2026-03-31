import { NavLink } from 'react-router-dom';

/**
 * Sidebar navigation — clean, modern dark sidebar matching the reference dashboard.
 * 
 * Desktop: static in flex flow (w-64), rounded-2xl, with padding from page edges.
 * Mobile: slides in as fixed overlay with backdrop.
 */

const tools = [
  {
    name: 'Dashboard',
    path: '/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    name: 'Header Inspector',
    path: '/header-inspector',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: 'JWT Tool',
    path: '/jwt-tool',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    name: 'Regex Tester',
    path: '/regex-tester',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    name: 'JSON Formatter',
    path: '/json-formatter',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    name: 'API Tester',
    path: '/api-tester',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
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
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        />
      )}

      {/* ===== Desktop sidebar — static in flex flow ===== */}
      <aside
        className="hidden lg:flex w-64 shrink-0 flex-col justify-between rounded-2xl p-5"
        style={{
          backgroundColor: 'var(--color-sidebar)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          height: 'calc(100vh - 2rem)',
        }}
      >
        {/* Logo area */}
        <div>
          <div className="flex items-center gap-2.5 mb-8">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              }}
            >
              D
            </div>
            <span className="text-[15px] font-bold text-white tracking-tight">
              DevProse
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-1">
            {tools.map((tool) => (
              <NavLink
                key={tool.path}
                to={tool.path}
                end={tool.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium
                   transition-all duration-200 group no-underline
                   ${isActive ? '' : 'hover:bg-white/10'}`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                  color: isActive ? '#ffffff' : '#94a3b8',
                })}
              >
                <span className="transition-transform duration-200 group-hover:scale-110 shrink-0 flex items-center">
                  {tool.icon}
                </span>
                <span className="truncate">{tool.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom branding */}
        <div
          className="pt-4"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
        >
          <p className="text-[11px] font-medium" style={{ color: '#64748b' }}>
            DevProse v1.0
          </p>
        </div>
      </aside>

      {/* ===== Mobile sidebar — fixed overlay ===== */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64
          flex flex-col justify-between p-5
          transition-transform duration-300 ease-in-out
          lg:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          backgroundColor: 'var(--color-sidebar)',
          borderRight: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        {/* Logo area */}
        <div>
          <div className="flex items-center gap-2.5 mb-8">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              }}
            >
              D
            </div>
            <span className="text-[15px] font-bold text-white tracking-tight">
              DevProse
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-1">
            {tools.map((tool) => (
              <NavLink
                key={tool.path}
                to={tool.path}
                onClick={onClose}
                end={tool.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium
                   transition-all duration-200 group no-underline
                   ${isActive ? '' : 'hover:bg-white/10'}`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                  color: isActive ? '#ffffff' : '#94a3b8',
                })}
              >
                <span className="transition-transform duration-200 group-hover:scale-110 shrink-0 flex items-center">
                  {tool.icon}
                </span>
                <span className="truncate">{tool.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom branding */}
        <div
          className="pt-4"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
        >
          <p className="text-[11px] font-medium" style={{ color: '#64748b' }}>
            DevProse v1.0
          </p>
        </div>
      </aside>
    </>
  );
}
