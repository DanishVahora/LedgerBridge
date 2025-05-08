import { useState } from 'react';
import { 
  DollarSign, 
  Calendar, 
  Building,
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Filter,
  Search,
  FileText,
  SendHorizonal,
  PhoneCall
} from 'lucide-react';

interface DuePayment {
  id: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  buyer: {
    name: string;
    creditRating: string;
    contactPerson: string;
    email: string;
    phone: string;
  };
  invoice: {
    number: string;
    amount: number;
    pdfUrl: string;
    issueDate: string;
  };
  factoringType: 'factoring' | 'reverse_factoring';
  status: 'upcoming' | 'overdue' | 'partially_paid';
  daysOverdue?: number;
  partialAmount?: number;
  collectionAttempts: {
    date: string;
    method: 'email' | 'phone' | 'reminder';
    response?: string;
  }[];
}

const DuePayments = () => {
  const [selectedPayment, setSelectedPayment] = useState<DuePayment | null>(null);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'overdue'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - Replace with API call
  const duePayments: DuePayment[] = [
    {
      id: 'DUE001',
      invoiceNumber: 'INV2025001',
      amount: 2500000,
      dueDate: '2025-05-15',
      buyer: {
        name: 'Global Industries Ltd',
        creditRating: 'AA+',
        contactPerson: 'John Smith',
        email: 'john.smith@global.com',
        phone: '+91 98765 43210'
      },
      invoice: {
        number: 'INV2025001',
        amount: 2500000,
        pdfUrl: '/invoices/INV2025001.pdf',
        issueDate: '2025-04-15'
      },
      factoringType: 'reverse_factoring',
      status: 'upcoming',
      collectionAttempts: []
    }
  ];

  const formatCurrency = (amount: number) => 
    `₹${(amount/100000).toFixed(1)}L`;

  const getDaysRemaining = (dueDate: string) => {
    const days = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    return days;
  };

  const getStatusColor = (status: string, daysRemaining: number) => {
    if (status === 'overdue') return 'text-red-600 bg-red-50 border-red-100';
    if (daysRemaining <= 7) return 'text-yellow-600 bg-yellow-50 border-yellow-100';
    return 'text-green-600 bg-green-50 border-green-100';
  };

  const handleSendReminder = async (payment: DuePayment) => {
    try {
      // API call simulation
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Reminder sent for:', payment.id);
      alert('Payment reminder sent successfully!');
    } catch (error) {
      console.error('Error sending reminder:', error);
      alert('Failed to send reminder. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header with Stats */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Due Collections</h1>
        <p className="text-gray-600 mt-2">Track and manage incoming payments from buyers</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-gradient-to-br from-[#006A71] to-[#48A6A7] rounded-xl p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/80">Total Due</p>
                <h3 className="text-2xl font-bold mt-1">₹185.5L</h3>
                <p className="text-sm mt-2">18 payments</p>
              </div>
              <DollarSign className="h-12 w-12 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600">Overdue</p>
                <h3 className="text-2xl font-bold text-red-600 mt-1">₹45.2L</h3>
                <p className="text-sm text-red-600 mt-2">5 payments</p>
              </div>
              <AlertTriangle className="h-12 w-12 text-red-200" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600">Due This Week</p>
                <h3 className="text-2xl font-bold text-yellow-600 mt-1">₹85.8L</h3>
                <p className="text-sm text-yellow-600 mt-2">8 payments</p>
              </div>
              <Clock className="h-12 w-12 text-yellow-200" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600">Collection Rate</p>
                <h3 className="text-2xl font-bold text-green-600 mt-1">92%</h3>
                <p className="text-sm text-green-600 mt-2">Last 30 days</p>
              </div>
              <CheckCircle2 className="h-12 w-12 text-green-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex space-x-2">
          {['all', 'upcoming', 'overdue'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${filterStatus === status
                  ? 'bg-[#006A71] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search buyers or invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Due Payments List */}
      <div className="space-y-4">
        {duePayments.map(payment => (
          <div key={payment.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-3 py-1 bg-[#F2EFE7] text-[#006A71] rounded-full text-sm font-medium">
                    {payment.invoiceNumber}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border
                    ${getStatusColor(payment.status, getDaysRemaining(payment.dueDate))}`}>
                    {getDaysRemaining(payment.dueDate) < 0 
                      ? `Overdue by ${Math.abs(getDaysRemaining(payment.dueDate))} days`
                      : `Due in ${getDaysRemaining(payment.dueDate)} days`}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{payment.buyer.name}</h3>
                <p className="text-gray-600">Credit Rating: {payment.buyer.creditRating}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSendReminder(payment)}
                  className="px-4 py-2 bg-[#F2EFE7] text-[#006A71] rounded-lg hover:bg-[#9ACBD0] 
                           transition-colors"
                >
                  <Bell size={20} />
                </button>
                <button
                  onClick={() => window.location.href = `mailto:${payment.buyer.email}`}
                  className="px-4 py-2 bg-[#F2EFE7] text-[#006A71] rounded-lg hover:bg-[#9ACBD0] 
                           transition-colors"
                >
                  <SendHorizonal size={20} />
                </button>
                <button
                  onClick={() => window.location.href = `tel:${payment.buyer.phone}`}
                  className="px-4 py-2 bg-[#F2EFE7] text-[#006A71] rounded-lg hover:bg-[#9ACBD0] 
                           transition-colors"
                >
                  <PhoneCall size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
              <div>
                <p className="text-sm text-gray-500">Amount Due</p>
                <p className="text-lg font-semibold text-gray-800">
                  {formatCurrency(payment.amount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="text-lg font-semibold text-gray-800">
                  {new Date(payment.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Issue Date</p>
                <p className="text-lg font-semibold text-gray-800">
                  {new Date(payment.invoice.issueDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Person</p>
                <p className="text-lg font-semibold text-gray-800">
                  {payment.buyer.contactPerson}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
              <div className="flex space-x-3">
                <a
                  href={payment.invoice.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 bg-[#F2EFE7] text-[#006A71] rounded-lg
                           hover:bg-[#9ACBD0] transition-colors text-sm"
                >
                  <FileText size={16} className="mr-2" />
                  View Invoice
                </a>
                <button className="flex items-center px-3 py-2 bg-gray-100 text-gray-600 rounded-lg
                                 hover:bg-gray-200 transition-colors text-sm"
                >
                  <ArrowUpRight size={16} className="mr-2" />
                  Collection History
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Last Reminder: {payment.collectionAttempts.length > 0 
                  ? new Date(payment.collectionAttempts[0].date).toLocaleDateString()
                  : 'No reminders sent'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DuePayments;