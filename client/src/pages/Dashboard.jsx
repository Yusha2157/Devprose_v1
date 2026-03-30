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
    name: 'More Coming Soon',
    description: 'JSON Formatter, Regex Tester, HTTP Header Inspector, and more tools are on the way.',
    path: null,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #64748b, #94a3b8)',
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          { label: 'Tools Available', value: '1' },
          { label: 'Coming Soon', value: '4+' },
          { label: 'API Endpoints', value: '1' },
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
