import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import FinancierNavbar from './FinancierNavbar';

const FinancierLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-[#F2EFE7]/10">
      {/* Sidebar for large screens */}
      <div className="hidden lg:block">
        <FinancierNavbar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative w-64 h-full">
            <FinancierNavbar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <FinancierTopNavbar onMenuClick={() => setIsSidebarOpen(true)} /> */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FinancierLayout;