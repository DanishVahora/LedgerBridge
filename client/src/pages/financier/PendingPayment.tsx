import { useState } from 'react';
import { 
  DollarSign, 
  Calendar, 
  Building,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Filter,
  Search,
  FileText,
  BadgeIndianRupee
} from 'lucide-react';

interface PendingPayment {
  id: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  approvalDate: string;
  seller: {
    name: string;
    accountDetails: {
      bankName: string;
      accountNumber: string;
      ifscCode: string;
    };
    gstin: string;
  };
  invoice: {
    number: string;
    amount: number;
    pdfUrl: string;
  };
  factoringType: 'factoring' | 'reverse_factoring';
  status: 'pending' | 'processing' | 'completed';
  priority: 'high' | 'medium' | 'low';
  buyer?: {
    name: string;
    creditRating: string;
  };
}

const PendingPayment = () => {
  const [selectedPayment, setSelectedPayment] = useState<PendingPayment | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount: number) => 
    `₹${(amount/100000).toFixed(1)}L`;

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'text-red-600 bg-red-50 border-red-100',
      medium: 'text-yellow-600 bg-yellow-50 border-yellow-100',
      low: 'text-green-600 bg-green-50 border-green-100'
    };
    return colors[priority as keyof typeof colors];
  };

  const handleInitiatePayment = async (payment: PendingPayment) => {
    try {
      // API call simulation
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Payment initiated:', payment.id);
      alert('Payment initiated successfully!');
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header with Stats */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Pending Payments</h1>
        <p className="text-gray-600 mt-2">Manage and process payments to sellers</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-gradient-to-br from-[#006A71] to-[#48A6A7] rounded-xl p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/80">Total Pending</p>
                <h3 className="text-2xl font-bold mt-1">₹125.5L</h3>
                <p className="text-sm mt-2">12 payments</p>
              </div>
              <BadgeIndianRupee className="h-12 w-12 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600">High Priority</p>
                <h3 className="text-2xl font-bold text-red-600 mt-1">₹45.2L</h3>
                <p className="text-sm text-red-600 mt-2">Due today</p>
              </div>
              <AlertCircle className="h-12 w-12 text-red-200" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600">Processing</p>
                <h3 className="text-2xl font-bold text-yellow-600 mt-1">₹35.8L</h3>
                <p className="text-sm text-yellow-600 mt-2">5 payments</p>
              </div>
              <Clock className="h-12 w-12 text-yellow-200" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600">Completed Today</p>
                <h3 className="text-2xl font-bold text-green-600 mt-1">₹89.2L</h3>
                <p className="text-sm text-green-600 mt-2">8 payments</p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex space-x-2">
          {['all', 'high', 'medium', 'low'].map((priority) => (
            <button
              key={priority}
              onClick={() => setFilterPriority(priority as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${filterPriority === priority
                  ? 'bg-[#006A71] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Payments List */}
      <div className="space-y-4">
        {/* Example Payment Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-3 py-1 bg-[#F2EFE7] text-[#006A71] rounded-full text-sm font-medium">
                  INV-2025001
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border
                  ${getPriorityColor('high')}`}>
                  High Priority
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Tech Manufacturing Ltd</h3>
              <p className="text-gray-600">GSTIN: 27AABCU9603R1ZX</p>
            </div>
            <button
              onClick={() => handleInitiatePayment({} as PendingPayment)} // Replace with actual payment
              className="px-4 py-2 bg-[#006A71] text-white rounded-lg hover:bg-[#48A6A7] 
                       transition-colors transform hover:scale-105"
            >
              Initiate Payment
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <div>
              <p className="text-sm text-gray-500">Amount</p>
              <p className="text-lg font-semibold text-gray-800">₹12.5L</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Due Date</p>
              <p className="text-lg font-semibold text-gray-800">May 10, 2025</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Bank</p>
              <p className="text-lg font-semibold text-gray-800">HDFC Bank</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Account</p>
              <p className="text-lg font-semibold text-gray-800">XXXX1234</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
            <div className="flex space-x-3">
              <button className="flex items-center px-3 py-2 bg-[#F2EFE7] text-[#006A71] rounded-lg
                               hover:bg-[#9ACBD0] transition-colors text-sm">
                <FileText size={16} className="mr-2" />
                View Invoice
              </button>
              <button className="flex items-center px-3 py-2 bg-gray-100 text-gray-600 rounded-lg
                               hover:bg-gray-200 transition-colors text-sm">
                <ArrowUpRight size={16} className="mr-2" />
                View Details
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Approved on May 8, 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingPayment;