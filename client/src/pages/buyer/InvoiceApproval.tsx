import { useState } from 'react';
import { 
  FileText, 
  Eye, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Download,
  Calendar,
  DollarSign,
  Clock,
  Building,
  FileCheck,
  Search
} from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  seller: {
    name: string;
    gstin: string;
  };
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'pending' | 'approved' | 'rejected';
  pdfUrl: string;
  description: string;
  items: {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }[];
  factoringType: 'factoring' | 'reverse_factoring';
  financier?: {
    name: string;
    interestRate: number;
  };
  timeline: {
    action: string;
    date: string;
    user: string;
    remark?: string;
  }[];
}

const InvoiceApproval = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [remark, setRemark] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [factoringFilter, setFactoringFilter] = useState<'all' | 'factoring' | 'reverse_factoring'>('all');

  // Mock data
  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2025-001',
      seller: {
        name: 'Tech Manufacturing Ltd',
        gstin: '27AAAAA0000A1Z5'
      },
      amount: 285000,
      issueDate: '2025-05-01',
      dueDate: '2025-06-15',
      status: 'pending',
      pdfUrl: '/invoices/INV-2025-001.pdf',
      description: 'Industrial equipment supplies',
      items: [
        {
          description: 'Industrial Motor X500',
          quantity: 2,
          rate: 75000,
          amount: 150000
        },
        {
          description: 'Control Panel P100',
          quantity: 3,
          rate: 45000,
          amount: 135000
        }
      ],
      factoringType: 'factoring',
      financier: {
        name: 'Financier A',
        interestRate: 5.5
      },
      timeline: [
        {
          action: 'submitted',
          date: '2025-05-01',
          user: 'User A'
        },
        {
          action: 'reviewed',
          date: '2025-05-05',
          user: 'User B',
          remark: 'Looks good'
        }
      ]
    },
    {
      id: '2',
      invoiceNumber: 'INV-2025-002',
      seller: {
        name: 'ABC Corp',
        gstin: '27BBBBB0000B1Z5'
      },
      amount: 150000,
      issueDate: '2025-05-10',
      dueDate: '2025-06-20',
      status: 'approved',
      pdfUrl: '/invoices/INV-2025-002.pdf',
      description: 'Office supplies',
      items: [
        {
          description: 'Office Chair',
          quantity: 10,
          rate: 5000,
          amount: 50000
        },
        {
          description: 'Office Desk',
          quantity: 5,
          rate: 20000,
          amount: 100000
        }
      ],
      factoringType: 'reverse_factoring',
      financier: {
        name: 'ABC Finance',
        interestRate: 12.5
      },
      timeline: [
        {
          action: 'Submitted',
          date: '2025-05-01',
          user: 'John Doe',
          remark: 'Initial submission'
        }
      ]
    }
  ];

  const handleApprove = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowRemarkModal(true);
  };

  const handleReject = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowRemarkModal(true);
  };

  const submitDecision = async (decision: 'approve' | 'reject') => {
    if (!selectedInvoice || !remark) return;

    try {
      // API call would go here
      console.log(`${decision}ing invoice:`, selectedInvoice.id, 'with remark:', remark);
      setShowRemarkModal(false);
      setRemark('');
      setSelectedInvoice(null);
    } catch (error) {
      console.error('Error processing invoice:', error);
    }
  };

  // Summary stats calculation
  const stats = {
    pendingCount: invoices.filter(i => i.status === 'pending').length,
    totalValue: invoices.reduce((sum, i) => sum + i.amount, 0),
    factoring: invoices.filter(i => i.factoringType === 'factoring').length,
    reverseFactoring: invoices.filter(i => i.factoringType === 'reverse_factoring').length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Enhanced Header with Stats */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Invoice Approval</h1>
        <p className="text-gray-600 mt-2">Review and process invoice financing requests</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-gradient-to-br from-[#006A71] to-[#48A6A7] rounded-xl p-6 text-white">
            <p className="text-sm opacity-80">Pending Approvals</p>
            <h3 className="text-2xl font-bold mt-1">{stats.pendingCount}</h3>
            <p className="text-sm mt-2 opacity-80">Require action</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#F2EFE7]">
            <p className="text-sm text-gray-600">Total Value</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              ₹{(stats.totalValue / 100000).toFixed(1)}L
            </h3>
            <p className="text-sm mt-2 text-[#006A71]">Current month</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#F2EFE7]">
            <p className="text-sm text-gray-600">Factoring Requests</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.factoring}</h3>
            <p className="text-sm mt-2 text-[#006A71]">Direct financing</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#F2EFE7]">
            <p className="text-sm text-gray-600">Reverse Factoring</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.reverseFactoring}</h3>
            <p className="text-sm mt-2 text-[#006A71]">Buyer program</p>
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-4">
            {/* Factoring Type Filter */}
            <div className="flex rounded-lg bg-[#F2EFE7] p-1">
              {[
                { value: 'all', label: 'All Types' },
                { value: 'factoring', label: 'Factoring' },
                { value: 'reverse_factoring', label: 'Reverse Factoring' }
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setFactoringFilter(type.value as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${factoringFilter === type.value
                      ? 'bg-white text-[#006A71] shadow'
                      : 'text-gray-600 hover:text-[#006A71]'}`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex rounded-lg bg-[#F2EFE7] p-1">
              {[
                { value: 'all', label: 'All Status' },
                { value: 'pending', label: 'Pending' },
                { value: 'approved', label: 'Approved' },
                { value: 'rejected', label: 'Rejected' }
              ].map((status) => (
                <button
                  key={status.value}
                  onClick={() => setFilterStatus(status.value as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${filterStatus === status.value
                      ? 'bg-white text-[#006A71] shadow'
                      : 'text-gray-600 hover:text-[#006A71]'}`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg 
                       focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Enhanced Invoice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {invoices
          .filter(invoice => 
            (factoringFilter === 'all' || invoice.factoringType === factoringFilter) &&
            (filterStatus === 'all' || invoice.status === filterStatus) &&
            (invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
             invoice.seller.name.toLowerCase().includes(searchTerm.toLowerCase()))
          )
          .map((invoice) => (
            <div 
              key={invoice.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200"
            >
              {/* Existing invoice card content with added factoring type badge */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${invoice.factoringType === 'factoring' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'}`}
                    >
                      {invoice.factoringType === 'factoring' ? 'Factoring' : 'Reverse Factoring'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${invoice.status === 'approved' ? 'bg-green-100 text-green-800' :
                        invoice.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}
                    >
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {invoice.invoiceNumber}
                  </h3>
                  <p className="text-gray-600">{invoice.seller.name}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <DollarSign size={16} className="mr-2" />
                  <span>₹{invoice.amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  <span>Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => setShowPdfModal(true)}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Eye size={16} className="mr-2" />
                  View PDF
                </button>
                {invoice.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(invoice)}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(invoice)}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <XCircle size={16} className="mr-2" />
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Remark Modal */}
      {showRemarkModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">
              {selectedInvoice.status === 'pending' ? 'Add Remark' : 'View Remark'}
            </h3>
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Enter your remarks..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006A71] focus:border-transparent mb-4"
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRemarkModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => submitDecision('approve')}
                className="px-4 py-2 bg-[#006A71] text-white rounded-lg hover:bg-[#005a61] transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {showPdfModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold">Invoice Details</h3>
              <button
                onClick={() => setShowPdfModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Seller Information</h4>
                <p className="text-gray-600">{selectedInvoice.seller.name}</p>
                <p className="text-gray-600">GSTIN: {selectedInvoice.seller.gstin}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Invoice Details</h4>
                <p className="text-gray-600">Invoice Number: {selectedInvoice.invoiceNumber}</p>
                <p className="text-gray-600">Amount: ₹{selectedInvoice.amount.toLocaleString()}</p>
                <p className="text-gray-600">Due Date: {new Date(selectedInvoice.dueDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-2">Items</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Description</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Quantity</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Rate</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2 text-sm text-gray-800">{item.description}</td>
                        <td className="px-4 py-2 text-sm text-gray-800 text-right">{item.quantity}</td>
                        <td className="px-4 py-2 text-sm text-gray-800 text-right">₹{item.rate.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-gray-800 text-right">₹{item.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-4 py-2 text-sm font-medium text-gray-800 text-right">Total</td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-800 text-right">
                        ₹{selectedInvoice.amount.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => window.open(selectedInvoice.pdfUrl, '_blank')}
                className="px-4 py-2 flex items-center text-[#006A71] hover:text-[#005a61]"
              >
                <Download size={16} className="mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceApproval;