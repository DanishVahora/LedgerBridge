import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileText, DollarSign, Clock, CheckCircle } from 'lucide-react';
import DashboardStats from '../../components/dashboard/DashboardStats';
import FinanceChart from '../../components/dashboard/FinanceChart';
import { useUserContext } from '../../context/UserContext';

interface Invoice {
  id: string;
  buyer: string;
  amount: string;
  status: string;
  date: string;
}

const SellerDashboard: React.FC = () => {
  const { user } = useUserContext();
  const supplierUsername = user?.userName || '';

  // Stats data can be fetched or remain static
  const stats = [
    { title: 'Total Invoices', value: '156', icon: <FileText />, color: '#48A6A7' },
    { title: 'Total Value', value: '₹45.2L', icon: <DollarSign />, color: '#006A71' },
    { title: 'Pending', value: '12', icon: <Clock />, color: '#9ACBD0' },
    { title: 'Funded', value: '142', icon: <CheckCircle />, color: '#48A6A7' }
  ];

  const [recentInvoices, setRecentInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supplierUsername) return;

    const fetchRecentInvoices = async () => {
      try {
        const response = await axios.get<Invoice[]>(
          `${import.meta.env.VITE_API_BASE_URL}/api/invoices/recent/${supplierUsername}`
        );
        console.log(response.data);
        setRecentInvoices(response.data);
      } catch (err: any) {
        console.error('Error fetching recent invoices:', err);
        setError('Unable to load recent invoices.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentInvoices();
  }, [supplierUsername]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your invoice financing activity</p>
      </div>

      {/* Stats Cards */}
      <DashboardStats stats={stats} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinanceChart />


        {/* Pending Buyer Acceptance */}
<div className="bg-white rounded-xl p-6 shadow-lg">
  <h2 className="text-lg font-semibold text-gray-800 mb-6">Pending Buyer Acceptance</h2>
  {loading ? (
    <div className="text-center text-gray-500 py-8">Loading...</div>
  ) : error ? (
    <div className="text-center text-red-500 py-8">{error}</div>
  ) : recentInvoices.filter((invoice) => invoice.status == 'PENDING').length === 0 ? (
    <div className="text-center text-gray-500 py-8">No Pending Invoices Found</div>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-200">
            <th className="pb-4 text-gray-600">Invoice ID</th>
            <th className="pb-4 text-gray-600">Buyer</th>
            <th className="pb-4 text-gray-600">Amount</th>
            <th className="pb-4 text-gray-600">Date</th>
          </tr>
        </thead>
        <tbody>
          {recentInvoices
            .filter((invoice) => invoice.status === 'PENDING')
            .map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-gray-100 hover:bg-[#F2EFE7]/50 transition-colors"
              >
                <td className="py-4">{invoice.invoiceId}</td>
                <td className="py-4">{invoice.companyName}</td>
                <td className="py-4">₹{invoice.amount}</td>
                <td className="py-4">{invoice.uploadDate}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )}
</div>
      </div>

      {/* Recent Invoices */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
        <h2 className="text-xl font-bold text-[#006A71] mb-6">Recent Invoices</h2>

        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : recentInvoices.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No recent invoices found.</div>
        ) : (
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
                {recentInvoices.map((invoice) => (
                  <tr
                    key={invoice.invoiceId}
                    className="border-b border-gray-100 hover:bg-[#F2EFE7]/50 transition-colors"
                  >
                    <td className="py-4">{invoice.invoiceId}</td>
                    <td className="py-4">{invoice.companyName}</td>
                    <td className="py-4">₹{invoice.amount}</td>
                    <td className="py-4">
                    <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          invoice.status === 'Funded'
                            ? 'bg-[#48A6A7]/20 text-[#006A71]'
                            : invoice.status === 'Pending'
                            ? 'bg-[#9ACBD0]/20 text-[#006A71]'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4">{invoice.uploadDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;