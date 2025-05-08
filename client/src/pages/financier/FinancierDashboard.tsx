import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  AlertCircle, 
  FileText,
  Calendar,
  Wallet,
  Activity,
  ArrowUpRight,
  Building,
  BadgeDollarSign
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

interface DashboardStats {
  totalFunded: number;
  activeDeals: number;
  totalSuppliers: number;
  totalBuyers: number;
  averageInterestRate: number;
  monthlyRevenue: number;
  riskScore: number;
  pendingRequests: number;
}

const FinancierDashboard = () => {
  // Mock data
  const stats: DashboardStats = {
    totalFunded: 125000000,
    activeDeals: 45,
    totalSuppliers: 120,
    totalBuyers: 25,
    averageInterestRate: 12.5,
    monthlyRevenue: 1500000,
    riskScore: 85,
    pendingRequests: 12
  };

  const monthlyData = [
    { month: 'Jan', factoring: 4500000, reversefactoring: 3200000 },
    { month: 'Feb', factoring: 5200000, reversefactoring: 3800000 },
    { month: 'Mar', factoring: 4800000, reversefactoring: 4200000 },
    { month: 'Apr', factoring: 6100000, reversefactoring: 4500000 },
    { month: 'May', factoring: 5800000, reversefactoring: 5100000 }
  ];

  const portfolioDistribution = [
    { name: 'Manufacturing', value: 35, color: '#006A71' },
    { name: 'IT & Services', value: 25, color: '#48A6A7' },
    { name: 'Retail', value: 20, color: '#9ACBD0' },
    { name: 'Healthcare', value: 15, color: '#F2EFE7' },
    { name: 'Others', value: 5, color: '#004a4f' }
  ];

  const recentRequests = [
    {
      id: 'REQ001',
      type: 'Factoring',
      company: 'Tech Manufacturing Ltd',
      amount: 2500000,
      date: '2025-05-08',
      risk: 'Low'
    },
    {
      id: 'REQ002',
      type: 'Reverse Factoring',
      company: 'Global Industries',
      amount: 3800000,
      date: '2025-05-08',
      risk: 'Medium'
    }
  ];

  const formatCurrency = (amount: number) => 
    `₹${(amount/100000).toFixed(1)}L`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Financier Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your financing operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#006A71] to-[#48A6A7] rounded-xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/80">Total Portfolio Value</p>
              <h3 className="text-2xl font-bold mt-1">{formatCurrency(stats.totalFunded)}</h3>
              <p className="text-sm mt-2 flex items-center">
                <TrendingUp size={16} className="mr-1" />
                +12.5% vs last month
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Wallet size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#F2EFE7] shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600">Active Programs</p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-bold text-gray-800">{stats.activeDeals}</h3>
                <p className="text-sm text-[#006A71] mb-1">Deals</p>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="flex items-center text-gray-600">
                  <Users size={14} className="mr-1" />
                  {stats.totalSuppliers} Suppliers
                </span>
                <span className="flex items-center text-gray-600">
                  <Building size={14} className="mr-1" />
                  {stats.totalBuyers} Buyers
                </span>
              </div>
            </div>
            <div className="bg-[#F2EFE7] p-3 rounded-lg">
              <Activity size={24} className="text-[#006A71]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#F2EFE7] shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600">Monthly Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(stats.monthlyRevenue)}</h3>
              <p className="text-sm mt-2 text-green-600 flex items-center">
                <TrendingUp size={16} className="mr-1" />
                +15.2% vs last month
              </p>
            </div>
            <div className="bg-[#F2EFE7] p-3 rounded-lg">
              <BadgeDollarSign size={24} className="text-[#006A71]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#F2EFE7] shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600">New Requests</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.pendingRequests}</h3>
              <p className="text-sm mt-2 text-[#006A71]">
                Requires review
              </p>
            </div>
            <div className="bg-[#F2EFE7] p-3 rounded-lg">
              <FileText size={24} className="text-[#006A71]" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Performance Chart */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Monthly Performance</h2>
            <div className="flex items-center gap-4">
              <span className="flex items-center text-sm text-gray-600">
                <div className="w-3 h-3 rounded-full bg-[#006A71] mr-2"></div>
                Factoring
              </span>
              <span className="flex items-center text-sm text-gray-600">
                <div className="w-3 h-3 rounded-full bg-[#48A6A7] mr-2"></div>
                Reverse Factoring
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => formatCurrency(value as number)}
              />
              <Bar dataKey="factoring" fill="#006A71" />
              <Bar dataKey="reversefactoring" fill="#48A6A7" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Portfolio Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Portfolio Distribution</h2>
          <div className="flex justify-between items-center">
            <ResponsiveContainer width="60%" height={300}>
              <PieChart>
                <Pie
                  data={portfolioDistribution}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {portfolioDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-[35%] space-y-2">
              {portfolioDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Requests */}
      {/* <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Requests</h2>
          <button className="text-[#006A71] hover:text-[#48A6A7] flex items-center text-sm">
            View All
            <ArrowUpRight size={16} className="ml-1" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(request.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      request.risk === 'Low' 
                        ? 'bg-green-100 text-green-800'
                        : request.risk === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {request.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default FinancierDashboard;