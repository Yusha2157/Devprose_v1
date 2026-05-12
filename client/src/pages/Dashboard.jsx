import { Link } from 'react-router-dom';

/**
 * Dashboard page — solid dark tool cards, gradient icon badges,
 * responsive grid with gap-6, and stats bar pushed to bottom.
 */

const availableTools = [
  {
    name: 'AI Code Explainer',
    description: 'Paste any code snippet and get instant AI-powered explanations, debugging tips, or optimization suggestions.',
    path: '/ai-explainer',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  {
    name: 'JSON Formatter',
    description: 'Prettify and validate your JSON data with customizable settings for readability.',
    path: '/json-formatter',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  },
  {
    name: 'Regex Tester',
    description: 'Test and debug regular expressions in real-time against sample text.',
    path: '/regex-tester',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
  },
  {
    name: 'HTTP Header Inspector',
    description: 'Analyze HTTP headers for websites to understand server configuration and security.',
    path: '/header-inspector',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
  },
  {
    name: 'API Tester',
    description: 'Send HTTP requests to any endpoint and inspect responses, headers, and status codes.',
    path: '/api-tester',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
  },
  {
    name: 'Snippet Manager',
    description: 'Save, organize, and quickly access your reusable code snippets with search and filtering.',
    path: '/snippets',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
  },
  {
  name: 'JWT Encoder / Decoder',
  description: 'Encode and decode JWT tokens, inspect payloads, and verify token validity.',
  path: '/jwt-tool',
  icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0110 0v4"></path>
    </svg>
  ),
  gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
},
];

const comingSoonTools = [
  'JWT Decoder', 'Base64 Encoder', 'Color Picker', 'Markdown Preview'
];

const stats = [
  {
    label: 'TOOLS AVAILABLE',
    value: '7',
    iconColor: '#3b82f6',
    iconBg: 'rgba(59, 130, 246, 0.15)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    label: 'COMING SOON',
    value: '4+',
    iconColor: '#10b981',
    iconBg: 'rgba(16, 185, 129, 0.15)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: 'API ENDPOINTS',
    value: '6',
    iconColor: '#06b6d4',
    iconBg: 'rgba(6, 182, 212, 0.15)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    label: 'STATUS',
    value: 'Live',
    isLive: true,
    iconColor: '#10b981',
    iconBg: 'rgba(16, 185, 129, 0.15)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero header */}
      <div className="mb-6">
        <h1
          className="text-3xl lg:text-4xl font-extrabold mb-3 leading-tight"
          style={{ color: '#ffffff' }}
        >
          Welcome back, <span className="gradient-text">DevProse</span>
        </h1>
        <p
          className="text-base lg:text-lg max-w-xl leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Your developer productivity suite. Pick a tool below to get started.
        </p>
      </div>

      {/* Tool cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {availableTools.map((tool, index) => (
          <Link
            key={tool.name}
            to={tool.path}
            className={`block no-underline animate-fade-in-up stagger-${index + 1}`}
            style={{ opacity: 0 }}
          >
            <div
              className="group h-full rounded-2xl p-7 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.10)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.10)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="space-y-4">
                {/* Icon badge + title row */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: tool.gradient }}
                  >
                    {tool.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-white leading-snug">
                    {tool.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Launch button */}
              <div
                className="mt-4 w-full h-11 flex items-center justify-center rounded-lg text-sm font-medium text-white transition-all duration-200 px-4"
                style={{
                  backgroundColor: '#2563eb',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                Launch Tool
              </div>
            </div>
          </Link>
        ))}

        {/* More tools coming soon placeholder */}
        <div
          className="animate-fade-in-up stagger-7 rounded-2xl p-7 flex flex-col items-center justify-center text-center min-h-[220px]"
          style={{
            opacity: 0,
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px dashed rgba(255, 255, 255, 0.12)',
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px dashed rgba(255, 255, 255, 0.15)',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#64748b' }}>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2" style={{ color: '#94a3b8' }}>
            More tools coming soon
          </h3>
          <p className="text-sm leading-relaxed max-w-[200px]" style={{ color: '#64748b' }}>
            {comingSoonTools.join(', ')}, and more on the way.
          </p>
        </div>
      </div>

      {/* Stats bar — pushed to bottom with mt-auto */}
      <div className="mt-auto pt-8 pb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`animate-fade-in-up stagger-${index + 1} rounded-xl p-4 flex items-center justify-between transition-all duration-200`}
            style={{
              opacity: 0,
              background: '#111827',
              border: '1px solid rgba(255, 255, 255, 0.10)',
            }}
          >
            {/* Text */}
            <div>
              <div className="flex items-center gap-2">
                {stat.isLive && (
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: '#4ade80', boxShadow: '0 0 6px rgba(74, 222, 128, 0.5)' }}
                  />
                )}
                <span
                  className="text-xl font-bold"
                  style={{ color: '#ffffff' }}
                >
                  {stat.value}
                </span>
              </div>
              <span
                className="text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: '#64748b' }}
              >
                {stat.label}
              </span>
            </div>

            {/* Colored icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: stat.iconBg,
                color: stat.iconColor,
              }}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
