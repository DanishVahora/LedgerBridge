import { useState } from 'react';
import { 
  Clock, 
  DollarSign, 
  AlertCircle, 
  Search,
  Calendar,
  FileText,
  Building,
  ArrowUpRight,
  Ban,
  Phone,
  Mail,
  Circle
} from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  financedAmount: number;
  financier: {
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
    interestRate: number;
    address: string;
  };
  dueDate: string;
  status: 'pending' | 'overdue' | 'paid' | 'processing';
  paymentHistory: {
    date: string;
    amount: number;
    type: 'principal' | 'interest';
    reference: string;
  }[];
  remainingAmount: number;
  interestAccrued: number;
  seller: {
    name: string;
    gstin: string;
  };
}

const InvoiceStatusPage = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data
  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV2025001',
      amount: 285000,
      financedAmount: 250000,
      financier: {
        name: 'ABC Finance Ltd',
        contactPerson: 'John Doe',
        email: 'john@abcfinance.com',
        phone: '+91 98765 43210',
        interestRate: 12.5,
        address: 'Mumbai, Maharashtra'
      },
      dueDate: '2025-06-15',
      status: 'pending',
      paymentHistory: [
        {
          date: '2025-05-01',
          amount: 50000,
          type: 'principal',
          reference: 'TXN001'
        }
      ],
      remainingAmount: 200000,
      interestAccrued: 15625,
      seller: {
        name: 'Tech Manufacturing Ltd',
        gstin: '27AAAAA0000A1Z5'
      }
    }
    // Add more mock invoices...
  ];

  const getStatusStyle = (status: 'pending' | 'overdue' | 'paid' | 'processing') => {
    const styles = {
      pending: 'bg-[#48A6A7] text-white',
      overdue: 'bg-red-500 text-white',
      paid: 'bg-green-500 text-white',
      processing: 'bg-[#9ACBD0] text-gray-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount: number) => 
    `₹${amount.toLocaleString('en-IN')}`;

  const calculateDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-[#F2EFE7]/20">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Invoice Status</h1>
        <p className="text-gray-600 mt-2">Track and manage your invoice payments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#006A71] to-[#48A6A7] rounded-xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-90">Total Outstanding</p>
              <h3 className="text-2xl font-bold mt-1">₹12.5L</h3>
              <p className="text-sm mt-2 opacity-90">8 invoices pending</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <DollarSign className="text-white" size={24} />
            </div>
          </div>
        </div>

        {/* Add more summary cards here */}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 mb-8 shadow-sm">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'overdue', 'paid'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${statusFilter === status 
                    ? 'bg-[#006A71] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Invoice List */}
      <div className="space-y-4">
        {invoices.map(invoice => (
          <div
            key={invoice.id}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {invoice.invoiceNumber}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(invoice.status)}`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{invoice.seller.name}</p>
              </div>
              <button
                onClick={() => setSelectedInvoice(invoice)}
                className="text-[#006A71] hover:text-[#48A6A7] flex items-center gap-1"
              >
                View Details
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Amount Due</p>
                <p className="text-lg font-semibold text-gray-800">
                  {formatCurrency(invoice.remainingAmount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="text-lg font-semibold text-gray-800">
                  {new Date(invoice.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Days Remaining</p>
                <p className={`text-lg font-semibold ${
                  calculateDaysRemaining(invoice.dueDate) < 7 ? 'text-red-600' : 'text-gray-800'
                }`}>
                  {calculateDaysRemaining(invoice.dueDate)} days
                </p>
              </div>
              {/* <div>
                <p className="text-sm text-gray-500">Interest Accrued</p>
                <p className="text-lg font-semibold text-gray-800">
                  {formatCurrency(invoice.interestAccrued)}
                </p>
              </div> */}
            </div>
          </div>
        ))}
      </div>

      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                Invoice Details
              </h3>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Financier Details */}
              <div className="bg-[#F2EFE7] rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Financier Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedInvoice.financier.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact Person</p>
                    <p className="font-medium">{selectedInvoice.financier.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedInvoice.financier.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Interest Rate</p>
                    <p className="font-medium">{selectedInvoice.financier.interestRate}% p.a.</p>
                  </div>
                </div>
              </div>

              {/* Payment History */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Payment History
                </h4>
                <div className="bg-white border rounded-lg divide-y">
                  {selectedInvoice.paymentHistory.map((payment, index) => (
                    <div key={index} className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{formatCurrency(payment.amount)}</p>
                        <p className="text-sm text-gray-600">
                          {payment.type.charAt(0).toUpperCase() + payment.type.slice(1)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {new Date(payment.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">Ref: {payment.reference}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceStatusPage;