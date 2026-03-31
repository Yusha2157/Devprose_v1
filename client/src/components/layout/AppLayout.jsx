import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

/**
 * AppLayout — master layout with Sidebar + main content.
 * 
 * Structure:
 *  - Outer wrapper: max-w-[1400px], centered, padded
 *  - Inner flex: sidebar (w-64, static) + main content (flex-1)
 *  - No position:fixed on sidebar — uses flex flow
 *  - Mobile: sidebar slides as overlay
 */
export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="h-screen w-full flex items-center justify-center"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Mobile hamburger */}
      <Navbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />

      {/* Contained dashboard shell */}
      <div className="w-full max-w-[1400px] mx-auto p-4 h-screen flex gap-6">
        {/* Sidebar — static in flex flow on desktop, overlay on mobile */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="px-2 py-6 lg:px-6 lg:py-8 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
