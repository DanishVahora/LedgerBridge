import { useState } from 'react';
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
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  FileText,
  AlertCircle,
  ArrowUpRight,
  
  BadgeDollarSign
} from 'lucide-react';

// interface Transaction {
//   id: string;
//   date: string;
//   invoiceNumber: string;
//   amount: number;
//   type: 'factoring' | 'reverse_factoring';
//   profitAmount: number;
//   profitPercentage: number;
//   seller: {
//     name: string;
//     id: string;
//   };
//   buyer: {
//     name: string;
//     id: string;
//   };
//   status: 'completed' | 'defaulted';
//   paymentDate: string;
// }

const FinancierHistory = () => {
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '6M' | '1Y'>('3M');
  // const [filterType, setFilterType] = useState<'all' | 'factoring' | 'reverse_factoring'>('all');

  // Mock data for charts
  const monthlyData = [
    { month: 'Jan', profit: 450000, volume: 3500000 },
    { month: 'Feb', profit: 520000, volume: 4200000 },
    { month: 'Mar', profit: 480000, volume: 3800000 },
    { month: 'Apr', profit: 610000, volume: 4800000 },
    { month: 'May', profit: 580000, volume: 4500000 }
  ];

  const portfolioDistribution = [
    { name: 'Factoring', value: 65, color: '#006A71' },
    { name: 'Reverse Factoring', value: 35, color: '#48A6A7' }
  ];

  const industryExposure = [
    { industry: 'Manufacturing', value: 35, color: '#006A71' },
    { industry: 'IT Services', value: 25, color: '#48A6A7' },
    { industry: 'Retail', value: 20, color: '#9ACBD0' },
    { industry: 'Healthcare', value: 15, color: '#F2EFE7' },
    { industry: 'Others', value: 5, color: '#004a4f' }
  ];

  const formatCurrency = (amount: number) => 
    `₹${(amount/100000).toFixed(1)}L`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header Stats */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Transaction History</h1>
        <p className="text-gray-600 mt-2">Overview of your financing activities and performance</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-gradient-to-br from-[#006A71] to-[#48A6A7] rounded-xl p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/80">Total Volume</p>
                <h3 className="text-2xl font-bold mt-1">₹1,250L</h3>
                <p className="text-sm mt-2 flex items-center">
                  <TrendingUp size={16} className="mr-1" />
                  +15.2% vs last month
                </p>
              </div>
              <BadgeDollarSign className="h-12 w-12 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600">Total Profit</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">₹156L</h3>
                <p className="text-sm text-green-600 mt-2">12.5% return</p>
              </div>
              <DollarSign className="h-12 w-12 text-[#006A71] opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600">Total Invoices</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">1,250</h3>
                <p className="text-sm text-[#006A71] mt-2">98% success rate</p>
              </div>
              <FileText className="h-12 w-12 text-[#006A71] opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600">Default Rate</p>
                <h3 className="text-2xl font-bold text-green-600 mt-1">0.5%</h3>
                <p className="text-sm text-green-600 mt-2">Industry avg: 2.1%</p>
              </div>
              <AlertCircle className="h-12 w-12 text-green-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Performance Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Monthly Performance</h2>
            <div className="flex space-x-2">
              {['1M', '3M', '6M', '1Y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range as any)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium
                    ${timeRange === range
                      ? 'bg-[#006A71] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Area 
                type="monotone" 
                dataKey="profit" 
                stackId="1"
                stroke="#006A71" 
                fill="#006A71" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="volume" 
                stackId="1"
                stroke="#48A6A7" 
                fill="#48A6A7" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Portfolio Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
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
            <div className="w-[35%]">
              {portfolioDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between mb-2">
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

      {/* Industry Distribution Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Industry Exposure</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={industryExposure}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="industry" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#006A71">
              {industryExposure.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Transaction History Table */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
          <button className="text-[#006A71] hover:text-[#48A6A7] flex items-center text-sm">
            View All
            <ArrowUpRight size={16} className="ml-1" />
          </button>
        </div>
        {/* Add transaction table here */}
      </div>
    </div>
  );
};

export default FinancierHistory;