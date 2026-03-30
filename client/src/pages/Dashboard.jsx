import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

/**
 * Dashboard page — landing page showing overview of available tools.
 * Acts as the entry point and tool discovery surface.
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
    name: 'HTTP Header Inspector',
    description: 'Inspect HTTP response headers for any URL. Analyze security headers, caching, and more.',
    path: '/header-inspector',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
  },
  {
    name: 'JWT Encoder / Decoder',
    description: 'Decode JWT tokens to inspect headers and payloads, or encode new tokens on the fly.',
    path: '/jwt-tool',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
  },
  {
    name: 'Regex Tester',
    description: 'Test regular expressions against sample text with real-time match highlighting.',
    path: '/regex-tester',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    name: 'JSON Formatter',
    description: 'Paste raw JSON to format, validate, and beautify. Supports minify and tree view.',
    path: '/json-formatter',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
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
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-10">
      {/* Hero header */}
      <div className="pt-4">
        <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight" style={{ color: 'var(--color-text)' }}>
          Welcome to <span className="gradient-text">DevProse</span>
        </h1>
        <p className="text-base lg:text-lg max-w-xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          Your developer productivity suite. Pick a tool below to get started.
        </p>
      </div>

      {/* Tool cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableTools.map((tool) => {
          const content = (
            <Card
              key={tool.name}
              className={`group h-full ${tool.path ? 'hover:-translate-y-1 hover:shadow-lg cursor-pointer' : 'opacity-50 cursor-default'}`}
            >
              <div className="flex items-start gap-5 p-2">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-white transition-transform duration-200 group-hover:scale-110"
                  style={{ background: tool.gradient }}
                >
                  {tool.icon}
                </div>
                <div className="pt-0.5">
                  <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--color-text)' }}>
                    {tool.name}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {tool.description}
                  </p>
                </div>
              </div>
            </Card>
          );

          return tool.path ? (
            <Link key={tool.name} to={tool.path} className="block no-underline">
              {content}
            </Link>
          ) : (
            <div key={tool.name}>{content}</div>
          );
        })}
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { label: 'Tools Available', value: '6' },
          { label: 'Categories', value: '4' },
          { label: 'API Endpoints', value: '6' },
          { label: 'Status', value: '● Live', valueColor: 'var(--color-success)' },
        ].map((stat) => (
          <Card key={stat.label} className="text-center py-6">
            <p
              className="text-2xl font-bold mb-2"
              style={{ color: stat.valueColor || 'var(--color-primary)' }}
            >
              {stat.value}
            </p>
            <p className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
              {stat.label}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
