import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import BuyerNavbar from './BuyerNavbar';
import TopNavbar from './BuyerTopNavbar';

const BuyerLayout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        // Close all dropdowns
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#F2EFE7]">
      {/* Mobile Nav Toggle Button */}
      <button 
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
      >
        <Menu size={24} className="text-[#006A71]" />
      </button>

      {/* Overlay for mobile */}
      {isNavOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsNavOpen(false)}
        />
      )}

      {/* Top Navbar */}
      <TopNavbar />

      {/* Navigation Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full z-50
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <BuyerNavbar onClose={() => setIsNavOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 pt-16 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default BuyerLayout;