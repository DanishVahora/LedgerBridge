import { Menu, Bell, Search } from 'lucide-react';

interface FinancierTopNavbarProps {
  onMenuClick: () => void;
}

const FinancierTopNavbar = ({ onMenuClick }: FinancierTopNavbarProps) => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 hover:bg-[#F2EFE7] rounded-lg text-gray-600"
      >
        <Menu size={24} />
      </button>

      <div className="hidden md:flex items-center flex-1 max-w-xl ml-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search transactions, invoices..."
            className="w-full pl-10 pr-4 py-2 bg-[#F2EFE7] rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#006A71]"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-[#F2EFE7] rounded-lg text-gray-600 relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-700">John Smith</p>
            <p className="text-xs text-[#006A71]">ABC Finance Ltd</p>
          </div>
          <button className="p-2 bg-[#F2EFE7] rounded-lg text-[#006A71] hover:bg-[#9ACBD0] transition-colors">
            <User size={20} />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default FinancierTopNavbar;