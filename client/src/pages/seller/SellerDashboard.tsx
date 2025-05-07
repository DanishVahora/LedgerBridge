import { FileText, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import DashboardStats from '../../components/dashboard/DashboardStats';
import FinanceChart from '../../components/dashboard/FinanceChart';

const SellerDashboard = () => {
  // Mock data
  const stats = [
    { title: 'Total Invoices', value: '156', icon: <FileText />, color: '#48A6A7' },
    { title: 'Total Value', value: '₹45.2L', icon: <DollarSign />, color: '#006A71' },
    { title: 'Pending', value: '12', icon: <Clock />, color: '#9ACBD0' },
    { title: 'Funded', value: '142', icon: <CheckCircle />, color: '#48A6A7' }
  ];

  const recentInvoices = [
    { id: 'INV001', buyer: 'Tech Corp', amount: '₹85,000', status: 'Funded', date: '2025-05-06' },
    { id: 'INV002', buyer: 'Global Industries', amount: '₹1,25,000', status: 'Pending', date: '2025-05-05' },
    { id: 'INV003', buyer: 'Mega Systems', amount: '₹95,000', status: 'Rejected', date: '2025-05-04' },
    { id: 'INV004', buyer: 'Innovate Ltd', amount: '₹2,15,000', status: 'Funded', date: '2025-05-03' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your invoice financing activity</p>
      </div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinanceChart />
        
        {/* Pending Buyer Acceptance */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Pending Buyer Acceptance</h2>
          <div className="text-center text-gray-500 py-8">
            No Records Found
          </div>
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
        <h2 className="text-xl font-bold text-[#006A71] mb-6">Recent Invoices</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="pb-4 text-gray-600">Invoice ID</th>
                <th className="pb-4 text-gray-600">Buyer</th>
                <th className="pb-4 text-gray-600">Amount</th>
                <th className="pb-4 text-gray-600">Status</th>
                <th className="pb-4 text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentInvoices.map((invoice, index) => (
                <tr 
                  key={index}
                  className="border-b border-gray-100 hover:bg-[#F2EFE7]/50 transition-colors"
                >
                  <td className="py-4">{invoice.id}</td>
                  <td className="py-4">{invoice.buyer}</td>
                  <td className="py-4">{invoice.amount}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      invoice.status === 'Funded' 
                        ? 'bg-[#48A6A7]/20 text-[#006A71]'
                        : invoice.status === 'Pending'
                        ? 'bg-[#9ACBD0]/20 text-[#48A6A7]'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4">{invoice.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;