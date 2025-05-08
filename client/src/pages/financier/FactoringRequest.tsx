import { useState } from 'react';
import { 
  Building, 
  FileText, 
  Calendar, 
  DollarSign, 
  User, 
  Phone, 
  Mail,
  ExternalLink,
  Timer,
  BadgeCheck,
  TrendingUp,
  X,
  Percent,
  AlertCircle
} from 'lucide-react';

interface FactoringRequest {
  id: string;
  invoiceNumber: string;
  amount: number;
  uploadDate: string;
  dueDate: string;
  pdfUrl: string;
  status: 'pending_bid' | 'bid_placed' | 'financed';
  seller: {
    name: string;
    registrationNumber: string;
    creditScore: number;
    address: string;
    contactPerson: string;
    email: string;
    phone: string;
    yearInBusiness: number;
  };
  buyer: {
    name: string;
    creditRating: string;
  };
  previousDeals?: number;
  expectedReturn?: number;
}

// Add new interface for bid data
interface BidData {
  interestRate: string;
  advanceAmount: string;
  validityPeriod: string;
  terms: string;
}

const FactoringRequest = () => {
  const [selectedRequest, setSelectedRequest] = useState<FactoringRequest | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidData, setBidData] = useState<BidData>({
    interestRate: '',
    advanceAmount: '',
    validityPeriod: '',
    terms: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data
  const requests: FactoringRequest[] = [
    {
      id: 'FR001',
      invoiceNumber: 'INV2025001',
      amount: 250000,
      uploadDate: '2025-05-08',
      dueDate: '2025-07-08',
      pdfUrl: '/invoices/INV2025001.pdf',
      status: 'pending_bid',
      seller: {
        name: 'Tech Manufacturing Ltd',
        registrationNumber: 'TM123456789',
        creditScore: 750,
        address: 'Mumbai, Maharashtra',
        contactPerson: 'Rahul Sharma',
        email: 'rahul@techmanufacturing.com',
        phone: '+91 98765 43210',
        yearInBusiness: 5
      },
      buyer: {
        name: 'Global Industries Corp',
        creditRating: 'AA+'
      },
      previousDeals: 12,
      expectedReturn: 12.5
    }
    // Add more mock data...
  ];

  const formatCurrency = (amount: number) => 
    `₹${(amount/100000).toFixed(1)}L`;

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      console.log('Bid submitted:', bidData, 'for invoice:', selectedRequest?.id);
      
      // Reset and close
      setShowBidModal(false);
      setBidData({
        interestRate: '',
        advanceAmount: '',
        validityPeriod: '',
        terms: ''
      });
      // Show success message
      alert('Bid placed successfully!');
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place bid. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Factoring Requests</h1>
        <p className="text-gray-600 mt-2">Review and bid on approved invoice requests</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#006A71] to-[#48A6A7] rounded-xl p-6 text-white
                      transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/80">Total Value</p>
              <h3 className="text-2xl font-bold mt-1">₹45.2L</h3>
              <p className="text-sm mt-2 flex items-center">
                <TrendingUp size={16} className="mr-1" />
                +15.2% vs last month
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <DollarSign size={24} className="text-white" />
            </div>
          </div>
        </div>
        {/* Add more stat cards */}
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {requests.map((request) => (
          <div 
            key={request.id}
            className="group bg-white rounded-xl p-6 hover:shadow-2xl transition-all duration-300
                     transform hover:-translate-y-1 relative overflow-hidden
                     border border-gray-100"
            style={{
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
            }}
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

            <div className="relative">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-3 py-1 bg-[#F2EFE7] text-[#006A71] rounded-full text-sm font-medium">
                      {request.invoiceNumber}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Factoring
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{request.seller.name}</h3>
                  <p className="text-gray-600 text-sm">{request.seller.registrationNumber}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedRequest(request);
                    setShowBidModal(true);
                  }}
                  className="px-4 py-2 bg-[#006A71] text-white rounded-lg hover:bg-[#48A6A7] 
                           transition-colors transform hover:scale-105"
                >
                  Place Bid
                </button>
              </div>

              {/* Key Information */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <DollarSign size={16} className="mr-2" />
                    Amount
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatCurrency(request.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Calendar size={16} className="mr-2" />
                    Due Date
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(request.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <BadgeCheck size={16} className="mr-2" />
                    Credit Score
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {request.seller.creditScore}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Timer size={16} className="mr-2" />
                    Previous Deals
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {request.previousDeals}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex space-x-3">
                  <a
                    href={request.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-2 bg-[#F2EFE7] text-[#006A71] rounded-lg
                             hover:bg-[#9ACBD0] transition-colors text-sm"
                  >
                    <FileText size={16} className="mr-2" />
                    View Invoice
                  </a>
                  <button
                    onClick={() => {
                      setSelectedRequest(request);
                      setShowDetailsModal(true);
                    }}
                    className="flex items-center px-3 py-2 bg-gray-100 text-gray-600 rounded-lg
                             hover:bg-gray-200 transition-colors text-sm"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Details
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Expected Return</p>
                  <p className="text-lg font-semibold text-green-600">
                    {request.expectedReturn}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          {/* Modal content */}
        </div>
      )}

      {/* Bid Modal */}
      {showBidModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl transform transition-all">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Place Bid</h3>
                <p className="text-gray-600">
                  Invoice: {selectedRequest.invoiceNumber}
                </p>
              </div>
              <button 
                onClick={() => setShowBidModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Bid Form */}
            <form onSubmit={handleBidSubmit} className="space-y-6">
              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={bidData.interestRate}
                    onChange={(e) => setBidData({ ...bidData, interestRate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
                    placeholder="Enter interest rate"
                  />
                  <Percent size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Advance Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Advance Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  value={bidData.advanceAmount}
                  onChange={(e) => setBidData({ ...bidData, advanceAmount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
                  placeholder="Enter advance amount"
                />
              </div>

              {/* Validity Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Validity Period (days)
                </label>
                <input
                  type="number"
                  required
                  value={bidData.validityPeriod}
                  onChange={(e) => setBidData({ ...bidData, validityPeriod: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
                  placeholder="Enter validity period"
                />
              </div>

              {/* Terms and Conditions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Terms
                </label>
                <textarea
                  value={bidData.terms}
                  onChange={(e) => setBidData({ ...bidData, terms: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71] focus:border-transparent"
                  rows={3}
                  placeholder="Enter any additional terms or conditions"
                />
              </div>

              {/* Warning Note */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="text-yellow-600 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-yellow-600">
                  Please review your bid carefully. Once submitted, it cannot be modified.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowBidModal(false)}
                  className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-[#006A71] text-white rounded-lg 
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#48A6A7]'} 
                    transition-colors`}
                >
                  {isSubmitting ? 'Placing Bid...' : 'Place Bid'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FactoringRequest;