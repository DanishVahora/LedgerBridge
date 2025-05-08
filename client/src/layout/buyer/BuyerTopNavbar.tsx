import { useState } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  Settings,
  LogOut,
  User,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'bid' | 'system' | 'alert';
}

const BuyerTopNavbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, ] = useState<Notification[]>([
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

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'bid':
        return <AlertCircle className="text-blue-500" size={16} />;
      case 'alert':
        return <Bell className="text-orange-500" size={16} />;
      default:
        return <Bell className="text-gray-500" size={16} />;
    }
  };

  return (
    <div className="h-16 bg-white shadow-sm fixed top-0 right-0 left-0 lg:left-64 z-40">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search invoices, sellers..."
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
              className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 relative"
            >
              <Bell size={20} className="text-gray-600" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  <button className="text-sm text-[#006A71] hover:underline">
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100
                                ${!notification.read ? 'bg-[#006A71]/5' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-800">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#006A71] to-[#48A6A7] 
                            flex items-center justify-center text-white font-medium">
                JS
              </div>
              <span className="text-sm font-medium text-gray-700">John Smith</span>
              <ChevronDown size={16} className="text-gray-600" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="p-4 border-b border-gray-100">
                  <p className="font-semibold text-gray-800">John Smith</p>
                  <p className="text-sm text-gray-600">john@company.com</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm hover:bg-gray-50 rounded-lg">
                    <User size={16} />
                    <span>View Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm hover:bg-gray-50 rounded-lg">
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm hover:bg-gray-50 rounded-lg">
                    <HelpCircle size={16} />
                    <span>Help & Support</span>
                  </button>
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg">
                      <LogOut size={16} />
                      <span>Sign Out</span>
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

export default BuyerTopNavbar;