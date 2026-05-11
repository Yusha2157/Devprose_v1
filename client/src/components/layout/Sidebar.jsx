import { NavLink } from 'react-router-dom';

/**
 * Sidebar navigation — polished, solid dark sidebar.
 *
 * Desktop: static in flex flow (w-64), rounded-2xl, bg-[#111827], border-white/10.
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
  {
    name: 'Vault',
    path: '/vault',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
        <polyline points="17 21 17 13 7 13 7 21"></polyline>
        <polyline points="7 3 7 8 15 8"></polyline>
      </svg>
    ),
  },
  {
    name: 'UUID / Hash',
    path: '/uuid-hash',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
  },
  {
    name: 'Cron Builder',
    path: '/cron-builder',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
  },
  {
    name: 'Base64 Tool',
    path: '/base64',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <path d="M2 15h10"></path>
        <path d="m9 18 3-3-3-3"></path>
      </svg>
    ),
  },
  {
    name: 'Color Picker',
    path: '/color-picker',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m2 22 1-1h3l9-9"></path>
        <path d="M3 21v-3l9-9"></path>
        <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z"></path>
      </svg>
    ),
  },
  {
    name: 'Markdown Preview',
    path: '/markdown',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <line x1="10" y1="9" x2="8" y2="9"></line>
      </svg>
    ),
  },
];

/** Shared nav link renderer for desktop and mobile */
function NavLinks({ onClick }) {
  return (
    <nav className="flex flex-col gap-1">
      {tools.map((tool) => (
        <NavLink
          key={tool.path}
          to={tool.path}
          onClick={onClick}
          end={tool.path === '/'}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium
             transition-all duration-200 group no-underline
             ${isActive ? '' : 'hover:bg-white/10'}`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#2563eb' : 'transparent',
            color: isActive ? '#ffffff' : '#d1d5db',
          })}
        >
          <span className="transition-transform duration-200 group-hover:scale-110 shrink-0 flex items-center">
            {tool.icon}
          </span>
          <span className="truncate">{tool.name}</span>
        </NavLink>
      ))}
    </nav>
  );
}

/** Shared logo */
function Logo() {
  return (
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
  );
}

/** Shared bottom branding */
function BottomBrand() {
  return (
    <div
      className="pt-4"
      style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}
    >
      <p className="text-[11px] font-medium" style={{ color: '#64748b' }}>
        DevProse v1.0
      </p>
    </div>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={onClose}
        />
      )}

      {/* ===== Desktop sidebar — static in flex flow ===== */}
      <aside
        className="hidden lg:flex w-64 shrink-0 flex-col justify-between rounded-2xl p-5 m-4"
        style={{
          backgroundColor: '#111827',
          border: '1px solid rgba(255, 255, 255, 0.10)',
          height: 'calc(100vh - 2rem)',
        }}
      >
        <div>
          <Logo />
          <NavLinks />
        </div>
        <BottomBrand />
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
          backgroundColor: '#111827',
          borderRight: '1px solid rgba(255, 255, 255, 0.10)',
        }}
      >
        <div>
          <Logo />
          <NavLinks onClick={onClose} />
        </div>
        <BottomBrand />
      </aside>
    </>
  );
}
