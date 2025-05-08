import { useState } from 'react';
import { 
  FileText, 
  Building, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  ChevronDown,
  ArrowUpRight,
  User,
  CreditCard,
  FileCheck
} from 'lucide-react';

interface FinanceRequest {
  id: string;
  type: 'factoring' | 'reverse_factoring';
  company: {
    name: string;
    registration: string;
    creditScore: number;
    yearsFounded: number;
  };
  amount: number;
  requestDate: string;
  dueDate: string;
  documents: {
    name: string;
    type: string;
    url: string;
  }[];
  riskScore: number;
  status: 'pending' | 'approved' | 'rejected';
  invoiceDetails: {
    number: string;
    issueDate: string;
    terms: number;
  };
}

const NewRequest = () => {
  const [activeTab, setActiveTab] = useState<'factoring' | 'reverse_factoring'>('factoring');
  const [selectedRequest, setSelectedRequest] = useState<FinanceRequest | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Mock data
  const requests: FinanceRequest[] = [
    {
      id: 'REQ001',
      type: 'factoring',
      company: {
        name: 'Tech Manufacturing Ltd',
        registration: 'TECH123456',
        creditScore: 750,
        yearsFounded: 5
      },
      amount: 2500000,
      requestDate: '2025-05-08',
      dueDate: '2025-07-08',
      documents: [
        { name: 'Invoice.pdf', type: 'invoice', url: '/docs/invoice1.pdf' },
        { name: 'Financial_Statement.pdf', type: 'financial', url: '/docs/statement1.pdf' }
      ],
      riskScore: 85,
      status: 'pending',
      invoiceDetails: {
        number: 'INV2025001',
        issueDate: '2025-05-01',
        terms: 60
      }
    }
    // Add more mock requests...
  ];

  const formatCurrency = (amount: number) => 
    `₹${(amount/100000).toFixed(1)}L`;

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleApprove = (request: FinanceRequest) => {
    // Implement approval logic
    console.log('Approving request:', request.id);
  };

  const handleReject = (request: FinanceRequest) => {
    // Implement rejection logic
    console.log('Rejecting request:', request.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">New Requests</h1>
        <p className="text-gray-600 mt-2">Review and process financing requests</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('factoring')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'factoring'
              ? 'bg-[#006A71] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Factoring Requests
        </button>
        <button
          onClick={() => setActiveTab('reverse_factoring')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'reverse_factoring'
              ? 'bg-[#006A71] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Reverse Factoring Requests
        </button>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 gap-6">
        {requests
          .filter(request => request.type === activeTab)
          .map(request => (
            <div 
              key={request.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {request.company.name}
                    </h3>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#F2EFE7] text-[#006A71]">
                      {request.id}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">
                    Registration: {request.company.registration}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleApprove(request)}
                    className="px-4 py-2 bg-[#006A71] text-white rounded-lg hover:bg-[#48A6A7] transition-colors"
                  >
                    <CheckCircle size={20} />
                  </button>
                  <button
                    onClick={() => handleReject(request)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <DollarSign size={16} className="mr-1" />
                    Amount
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {formatCurrency(request.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Calendar size={16} className="mr-1" />
                    Due Date
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(request.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    Risk Score
                  </p>
                  <p className={`text-lg font-semibold ${getRiskColor(request.riskScore)}`}>
                    {request.riskScore}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <CreditCard size={16} className="mr-1" />
                    Credit Score
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {request.company.creditScore}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div className="flex space-x-3">
                  {request.documents.map((doc, index) => (
                    <a
                      key={index}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-[#F2EFE7] text-[#006A71] rounded-lg text-sm 
                               hover:bg-[#9ACBD0] transition-colors flex items-center"
                    >
                      <FileText size={16} className="mr-2" />
                      {doc.name}
                    </a>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setSelectedRequest(request);
                    setShowDetailsModal(true);
                  }}
                  className="text-[#006A71] hover:text-[#48A6A7] flex items-center text-sm"
                >
                  View Details
                  <ArrowUpRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            {/* Modal content */}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewRequest;