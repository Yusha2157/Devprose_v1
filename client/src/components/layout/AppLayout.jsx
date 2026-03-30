import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

/**
 * AppLayout — master layout wrapper with Navbar, Sidebar, and main content area.
 * Uses <Outlet /> to render child routes.
 *
 * Layout strategy:
 *  - Navbar is fixed at top (h-16 = 64px)
 *  - A spacer div (h-16) pushes everything below the fixed navbar
 *  - Below is a flex row: Sidebar (sticky) + Main (flex-1)
 */
export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />

      {/* Spacer to push content below fixed navbar */}
      <div className="h-16" />

      {/* Content row: Sidebar + Main */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto px-6 py-8 lg:pl-14 lg:pr-12 lg:py-10">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
