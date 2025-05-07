import { useState } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Settings,
  LogOut,
  User,
  HelpCircle
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'bid' | 'system' | 'alert';
}

const TopNavbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Bid Received',
      message: 'You have received a new bid for Invoice #INV-2025-001',
      time: '5 mins ago',
      read: false,
      type: 'bid'
    },
    {
      id: '2',
      title: 'Due Date Reminder',
      message: 'Invoice #INV-2025-002 is due in 3 days',
      time: '1 hour ago',
      read: false,
      type: 'alert'
    }
  ]);

  return (
    <div className="h-16 bg-white shadow-sm fixed top-0 right-0 left-0 lg:left-64 z-40">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search invoices, buyers..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-[#006A71] 
                       focus:ring-2 focus:ring-[#006A71]/20 transition-all duration-200"
            />
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <Bell size={20} className="text-gray-600" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer
                                ${!notification.read ? 'bg-blue-50/50' : ''}`}
                    >
                      <p className="font-medium text-sm text-gray-800">{notification.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#006A71] flex items-center justify-center">
                <span className="text-white font-medium text-sm">JS</span>
              </div>
              <ChevronDown size={16} className="text-gray-600" />
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-semibold text-gray-800">John Smith</p>
                  <p className="text-sm text-gray-600">john@techcorp.com</p>
                </div>
                <div className="py-1">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2">
                    <User size={16} className="text-gray-500" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2">
                    <Settings size={16} className="text-gray-500" />
                    <span>Settings</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2">
                    <HelpCircle size={16} className="text-gray-500" />
                    <span>Help & Support</span>
                  </button>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-red-600">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;