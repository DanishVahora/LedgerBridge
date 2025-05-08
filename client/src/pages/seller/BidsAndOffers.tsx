import { useState } from 'react';
import { Eye, Check, X, TrendingUp, Clock, DollarSign } from 'lucide-react';


interface Bid {
  id: string;
  buyerId: string;
  buyerName: string;
  bidAmount: number;
  discountRate: number;
  dueDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
}


interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  companyName: string;
  status: 'pending' | 'traded' | 'expired';
  bids: Bid[];
}


const BidsAndOffers = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);


  // Mock data - replace with API call
  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2025-001',
      amount: 50000,
      issueDate: '2025-05-01',
      dueDate: '2025-06-01',
      companyName: 'Tech Corp',
      status: 'pending',
      bids: [
        {
          id: 'bid1',
          buyerId: 'buyer1',
          buyerName: 'Capital Financiers',
          bidAmount: 48500,
          discountRate: 3.0,
          dueDate: '2025-06-01',
          status: 'pending',
          timestamp: '2025-05-07T10:00:00Z'
        }
      ]
    }
  ];


  const handleAcceptBid = (invoiceId: string, bidId: string) => {
    // Implement bid acceptance logic
    console.log('Accepting bid:', bidId, 'for invoice:', invoiceId);
  };


  const handleRejectBid = (invoiceId: string, bidId: string) => {
    // Implement bid rejection logic
    console.log('Rejecting bid:', bidId, 'for invoice:', invoiceId);
  };


  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Bids & Offers</h1>
        <p className="text-gray-600 mt-2">Manage your invoice trading activities</p>
      </div>


      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {['pending', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'pending' | 'history')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${activeTab === tab
                ? 'bg-[#006A71] text-white shadow-lg transform -translate-y-0.5'
                : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>


      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoices List */}
        <div className="lg:col-span-2 space-y-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              onClick={() => setSelectedInvoice(invoice)}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {invoice.invoiceNumber}
                  </h3>
                  <p className="text-gray-600">{invoice.companyName}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Due: {new Date(invoice.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>


              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <DollarSign size={20} className="text-[#006A71]" />
                  <span className="font-semibold text-xl text-gray-800">
                    ${invoice.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp size={16} className="text-[#006A71]" />
                  <span className="text-sm font-medium text-[#006A71]">
                    {invoice.bids.length} {invoice.bids.length === 1 ? 'bid' : 'bids'}
                  </span>
                </div>
              </div>


              {/* Latest Bid Preview */}
              {invoice.bids[0] && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Latest Bid</p>
                      <p className="font-medium text-gray-800">
                        ${invoice.bids[0].bidAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAcceptBid(invoice.id, invoice.bids[0].id);
                        }}
                        className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRejectBid(invoice.id, invoice.bids[0].id);
                        }}
                        className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>


        {/* Bid Details Panel */}
        <div className="lg:col-span-1">
          {selectedInvoice ? (
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-6">
              <h3 className="font-semibold text-xl mb-4">Bid Details</h3>
              {selectedInvoice.bids.map((bid) => (
                <div
                  key={bid.id}
                  className="border-b border-gray-100 last:border-0 py-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-medium text-gray-800">{bid.buyerName}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(bid.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <span className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${bid.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        bid.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'}
                    `}>
                      {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                    </span>
                  </div>


                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Bid Amount</p>
                      <p className="font-medium text-gray-800">
                        ${bid.bidAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Discount Rate</p>
                      <p className="font-medium text-gray-800">
                        {bid.discountRate}%
                      </p>
                    </div>
                  </div>


                  {bid.status === 'pending' && (
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handleAcceptBid(selectedInvoice.id, bid.id)}
                        className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg
                                 hover:bg-green-600 transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectBid(selectedInvoice.id, bid.id)}
                        className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg
                                 hover:bg-red-600 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Eye size={40} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">
                Select an invoice to view bid details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default BidsAndOffers;