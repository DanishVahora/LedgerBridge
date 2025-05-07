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
  FileCheck
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
}

const InvoiceApproval = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [remark, setRemark] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');

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
      ]
    },
    // Add more mock invoices...
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Invoice Approval</h1>
        <p className="text-gray-600 mt-2">Review and approve invoices from your sellers</p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${filterStatus === status 
                  ? 'bg-[#006A71] text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
          />
        </div>
      </div>

      {/* Invoices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {invoices.map((invoice) => (
          <div 
            key={invoice.id}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {invoice.invoiceNumber}
                </h3>
                <p className="text-gray-600">{invoice.seller.name}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium
                ${invoice.status === 'approved' ? 'bg-green-100 text-green-800' :
                  invoice.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'}`}
              >
                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
              </span>
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