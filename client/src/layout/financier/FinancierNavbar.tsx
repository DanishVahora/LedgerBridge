import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Building,
  Receipt,
  Users,
  LineChart,
  Settings,
  LogOut,
  ChevronRight,
  X,
  BriefcaseIcon,
  History,
  FileCheck,
  Calculator,
  Wallet,
  PieChart,
  BadgeDollarSign
} from 'lucide-react';

interface FinancierNavbarProps {
  onClose: () => void;
}

const FinancierNavbar = ({ onClose }: FinancierNavbarProps) => {
  const navItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/financier/dashboard'
    },
    {
      title: 'Invoice Factoring',
      icon: <Receipt size={20} />,
      subItems: [
        {
          title: 'New Requests',
          path: '/financier/factoring/requests',
          icon: <FileText size={20} />
        },
        {
          title: 'Active Deals',
          path: '/financier/factoring/active',
          icon: <FileCheck size={20} />
        },
        {
          title: 'Risk Assessment',
          path: '/financier/factoring/risk',
          icon: <Calculator size={20} />
        },
        {
          title: 'Supplier Management',
          path: '/financier/factoring/suppliers',
          icon: <Users size={20} />
        }
      ]
    },
    {
      title: 'Reverse Factoring',
      icon: <Building size={20} />,
      subItems: [
        {
          title: 'Buyer Programs',
          path: '/financier/reverse/programs',
          icon: <BriefcaseIcon size={20} />
        },
        {
          title: 'Supplier Onboarding',
          path: '/financier/reverse/suppliers',
          icon: <Users size={20} />
        },
        {
          title: 'Invoice Processing',
          path: '/financier/reverse/invoices',
          icon: <FileCheck size={20} />
        },
        {
          title: 'Credit Limits',
          path: '/financier/reverse/credit-limits',
          icon: <BadgeDollarSign size={20} />
        }
      ]
    },
    {
      title: 'Portfolio',
      icon: <Wallet size={20} />,
      path: '/financier/portfolio'
    },
    {
      title: 'Analytics',
      icon: <PieChart size={20} />,
      subItems: [
        {
          title: 'Performance',
          path: '/financier/analytics/performance',
          icon: <LineChart size={20} />
        },
        {
          title: 'Risk Metrics',
          path: '/financier/analytics/risk',
          icon: <Calculator size={20} />
        }
      ]
    },
    {
      title: 'Transaction History',
      icon: <History size={20} />,
      path: '/financier/transactions'
    },
    {
      title: 'Settings',
      icon: <Settings size={20} />,
      path: '/financier/settings'
    }
  ];

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-[#006A71] to-[#004a4f] text-white flex flex-col shadow-2xl">
      {/* Mobile close button */}
      <button 
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-2 rounded-full hover:bg-white/10"
      >
        <X size={20} />
      </button>

      {/* Logo Section */}
      <div className="p-6 border-b border-[#48A6A7]/30 bg-[#006A71]/50">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-[#F2EFE7] shadow-lg transform hover:scale-105 transition-transform">
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-[#006A71] font-bold text-lg">LB</span>
            </div>
          </div>
          <span className="font-semibold text-lg">LedgerBridge</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <div className="space-y-2">
          {navItems.map((item, index) => (
            <div key={index} className="space-y-1">
              {item.subItems ? (
                <>
                  <div className="px-4 py-2 text-[#9ACBD0] text-sm font-medium">
                    {item.title}
                  </div>
                  <div className="pl-4 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.path}
                        onClick={onClose}
                        className={({ isActive }) => `
                          group flex items-center space-x-3 px-4 py-3 rounded-xl
                          transition-all duration-300
                          ${isActive 
                            ? 'bg-gradient-to-r from-[#48A6A7] to-[#48A6A7]/80 text-white shadow-lg' 
                            : 'text-[#9ACBD0] hover:bg-[#48A6A7]/20'}
                          transform hover:scale-[1.02] hover:-translate-y-0.5
                        `}
                      >
                        <div className="transform transition-transform duration-300 group-hover:scale-110">
                          {subItem.icon}
                        </div>
                        <span>{subItem.title}</span>
                        <ChevronRight 
                          size={16} 
                          className="ml-auto transform transition-transform duration-300 opacity-0 group-hover:opacity-100" 
                        />
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : (
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) => `
                    group flex items-center space-x-3 px-4 py-3 rounded-xl
                    transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-[#48A6A7] to-[#48A6A7]/80 text-white shadow-lg' 
                      : 'text-[#9ACBD0] hover:bg-[#48A6A7]/20'}
                    transform hover:scale-[1.02] hover:-translate-y-0.5
                  `}
                >
                  <div className="transform transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <span>{item.title}</span>
                  <ChevronRight 
                    size={16} 
                    className="ml-auto transform transition-transform duration-300 opacity-0 group-hover:opacity-100" 
                  />
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-[#48A6A7]/30 bg-gradient-to-b from-transparent to-[#004a4f]">
        <button 
          onClick={() => {/* Implement logout */}} 
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl
                   text-[#9ACBD0] hover:bg-[#48A6A7]/20 transition-all duration-300
                   transform hover:scale-[1.02] group"
        >
          <div className="transform transition-transform duration-300 group-hover:scale-110">
            <LogOut size={20} />
          </div>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default FinancierNavbar;