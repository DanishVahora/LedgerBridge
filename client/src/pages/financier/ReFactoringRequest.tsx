import { useState } from 'react';
import { 
 
  DollarSign, 
 
  TrendingUp,
  X,
  Briefcase,
  Users,
} from 'lucide-react';

interface ReFactoringRequest {
  id: string;
  programId: string;
  buyer: {
    name: string;
    creditRating: string;
    programLimit: number;
    usedLimit: number;
    enrolledSuppliers: number;
    avgPaymentDays: number;
    contactPerson: string;
    email: string;
  };
  invoices: {
    id: string;
    number: string;
    amount: number;
    issueDate: string;
    dueDate: string;
    supplier: {
      name: string;
      creditScore: number;
    };
    status: 'pending' | 'approved' | 'financed';
  }[];
  riskScore: number;
  expectedReturn: number;
  documents: {
    name: string;
    type: 'program' | 'financial' | 'legal';
    url: string;
  }[];
}

interface ProgramBid {
  interestRate: string;
  creditLimit: string;
  tenorDays: string;
  additionalTerms: string;
}

const ReFactoringRequest = () => {
  const [selectedProgram, setSelectedProgram] = useState<ReFactoringRequest | null>(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidData, setBidData] = useState<ProgramBid>({
    interestRate: '',
    creditLimit: '',
    tenorDays: '',
    additionalTerms: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgram) return;

    setIsSubmitting(true);
    try {
      // API call simulation
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Submitted bid:', bidData, 'for program:', selectedProgram.programId);
      
      setShowBidModal(false);
      setBidData({
        interestRate: '',
        creditLimit: '',
        tenorDays: '',
        additionalTerms: ''
      });
      alert('Program proposal submitted successfully!');
    } catch (error) {
      console.error('Error submitting proposal:', error);
      alert('Failed to submit proposal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header with Stats */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Reverse Factoring Programs</h1>
        <p className="text-gray-600 mt-2">Manage buyer-led supply chain finance programs</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-gradient-to-br from-[#006A71] to-[#48A6A7] rounded-xl p-6 text-white">
            <div className="flex justify-between">
              <div>
                <p className="text-sm opacity-80">Active Programs</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
                <p className="text-sm mt-2">
                  <span className="flex items-center">
                    <TrendingUp size={16} className="mr-1" />
                    +3 this month
                  </span>
                </p>
              </div>
              <Briefcase className="h-12 w-12 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Exposure</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">₹850L</h3>
                <p className="text-sm text-green-600 mt-2">Within limits</p>
              </div>
              <DollarSign className="h-12 w-12 text-[#006A71] opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-600">Enrolled Suppliers</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">145</h3>
                <p className="text-sm text-[#006A71] mt-2">Across programs</p>
              </div>
              <Users className="h-12 w-12 text-[#006A71] opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Return</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">12.5%</h3>
                <p className="text-sm text-green-600 mt-2">+2.1% vs target</p>
              </div>
              <TrendingUp className="h-12 w-12 text-[#006A71] opacity-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Program List */}
      <div className="space-y-6">
        {/* Program Card - Repeat for each program */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-3 py-1 bg-[#F2EFE7] text-[#006A71] rounded-full text-sm font-medium">
                    PRG-001
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Global Industries Ltd</h3>
                <p className="text-gray-600">Credit Rating: AA+</p>
              </div>
              <button
                onClick={() => {
                  setSelectedProgram(null); // Replace with actual program data
                  setShowBidModal(true);
                }}
                className="px-4 py-2 bg-[#006A71] text-white rounded-lg hover:bg-[#48A6A7] 
                         transition-colors transform hover:scale-105"
              >
                Submit Proposal
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-6">
              <div>
                <p className="text-sm text-gray-500">Program Limit</p>
                <p className="text-lg font-semibold text-gray-800">₹500L</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Utilization</p>
                <p className="text-lg font-semibold text-gray-800">65%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Suppliers</p>
                <p className="text-lg font-semibold text-gray-800">28</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-gray-800">Submit Program Proposal</h3>
              <button 
                onClick={() => setShowBidModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleBidSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={bidData.interestRate}
                  onChange={(e) => setBidData({ ...bidData, interestRate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Credit Limit
                </label>
                <input
                  type="number"
                  required
                  value={bidData.creditLimit}
                  onChange={(e) => setBidData({ ...bidData, creditLimit: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Tenor (Days)
                </label>
                <input
                  type="number"
                  required
                  value={bidData.tenorDays}
                  onChange={(e) => setBidData({ ...bidData, tenorDays: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Terms
                </label>
                <textarea
                  value={bidData.additionalTerms}
                  onChange={(e) => setBidData({ ...bidData, additionalTerms: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#006A71]"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBidModal(false)}
                  className="px-6 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-[#006A71] text-white rounded-lg 
                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#48A6A7]'}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReFactoringRequest;