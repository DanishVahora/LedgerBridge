import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileUp, 
  Gavel, 
  Settings, 
  LogOut,
  ChevronRight,
  X
} from 'lucide-react';

interface SellerNavbarProps {
  onClose: () => void;
}

const SellerNavbar = ({ onClose }: SellerNavbarProps) => {
  const navItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/seller/dashboard'
    },
    {
      title: 'Upload Invoice',
      icon: <FileUp size={20} />,
      path: '/seller/upload'
    },
    {
      title: 'Bids & Offers',
      icon: <Gavel size={20} />,
      path: '/seller/bids'
    },
    // {
    //   title: 'Invoices',
    //   icon: <FileText size={20} />,
    //   path: '/seller/invoices'
    // },
    {
      title: 'Settings',
      icon: <Settings size={20} />,
      path: '/seller/settings'
    }
  ];

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-[#006A71] to-[#004a4f] text-white flex flex-col shadow-2xl relative">
      {/* Close button for mobile */}
      <button 
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <X size={20} />
      </button>

      {/* Logo Section with 3D effect */}
      <div className="p-6 border-b border-[#48A6A7]/30 bg-[#006A71]/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-white shadow-lg transform hover:scale-105 transition-transform duration-200 hover:rotate-3">
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-white to-[#f8f8f8]">
              <span className="text-[#006A71] font-bold text-lg">LB</span>
            </div>
          </div>
          <span className="font-semibold text-lg text-white/90">LedgerBridge</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <div className="space-y-2">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => `
                group flex items-center space-x-3 px-4 py-3 rounded-xl
                transition-all duration-300 relative
                overflow-hidden
                ${isActive 
                  ? 'bg-gradient-to-r from-[#48A6A7] to-[#48A6A7]/80 text-white shadow-lg' 
                  : 'text-[#9ACBD0] hover:bg-[#48A6A7]/20'}
                transform hover:scale-[1.02] hover:-translate-y-0.5
              `}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                            opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              
              {/* Content */}
              <div className="relative flex items-center space-x-3 w-full">
                <div className="transform transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <span className="flex-1">{item.title}</span>
                <ChevronRight 
                  size={16} 
                  className="transform transition-all duration-300 opacity-0 -translate-x-2 
                           group-hover:opacity-100 group-hover:translate-x-0" 
                />
              </div>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-[#48A6A7]/30 bg-gradient-to-b from-transparent to-[#004a4f]">
        <button 
          onClick={() => {/* Implement logout */}} 
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl
                    text-[#9ACBD0] hover:bg-[#48A6A7]/20 transition-all duration-300
                    transform hover:scale-[1.02] hover:-translate-y-0.5
                    group relative overflow-hidden"
        >
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                        opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
          
          {/* Content */}
          <div className="relative flex items-center space-x-3">
            <LogOut size={20} className="transform transition-transform duration-300 group-hover:scale-110" />
            <span>Logout</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SellerNavbar;