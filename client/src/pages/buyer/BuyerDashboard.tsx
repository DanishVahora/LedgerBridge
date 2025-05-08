import {
  FileText,
  DollarSign,
  Clock,
  AlertCircle,
  Calendar,
  TrendingUp,
  CreditCard,
  Loader2,
} from "lucide-react";
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
} from "recharts";
import type { LucideIcon } from "lucide-react";


import { useEffect, useState } from "react";
import { toast } from "sonner";

import axios from "axios";
// types/dashboard.ts
const iconMap = {
  DollarSign,
  Clock,
  Calendar,
  CreditCard,
  TrendingUp,
  FileText,
} as const;


// 2. Create type for icon names
type IconName = keyof typeof iconMap;


// 3. Helper function to get icon component
function getIconComponent(name: string): LucideIcon {
  return iconMap[name as IconName] || FileText;
}


const iconComponents: Record<string, React.ComponentType<any>> = {
  DollarSign,
  Clock,
  Calendar,
  CreditCard,
  FileText, // default fallback
};
export interface StatsCardDto {
  title: string;
  value: string;
  subtext: string;
  iconType: keyof typeof iconComponents;
  trend: "up" | "down" | "neutral";
}


export interface PaymentHistoryDto {
  month: string;
  amount: number;
}


export interface PaymentDistributionDto {
  name: string;
  value: number;
  color: string;
}


export interface PendingInvoiceDto {
  id: string;
  seller: string;
  amount: string;
  dueDate: string;
  status: string;
}
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/buyers`,
  headers: { "Content-Type": "application/json" },
});


export interface BuyerDashboardDto {
  statsCards: StatsCardDto[];
  paymentHistory: PaymentHistoryDto[];
  paymentDistribution: PaymentDistributionDto[];
  pendingInvoices: PendingInvoiceDto[];
}
interface BuyerFormData {
  userName: string | null;
  buyerPan: string;
  mobile: string;
  companyName: string;
  gstin: string;
  registeredAddress: string;
  contactName: string;
  contactDesignation: string;
  contactEmail: string;
  contactPhone: string;
  industrySector: string;
  turnoverBracket: string;
  desiredCreditLimit: string;
  accountNumber: string;
  bankName: string;
  ifsc: string;
  password: string;
  confirmPassword: string;
}
const BuyerDashboard = () => {
  const [dashboardData, setDashboardData] = useState<BuyerDashboardDto>({
    statsCards: [],
    paymentHistory: [],
    paymentDistribution: [],
    pendingInvoices: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userString = sessionStorage.getItem("user");
  const user = userString ? (JSON.parse(userString) as BuyerFormData) : null;
  const buyerUsername = user?.userName || ""; // Provide a default empty string if null
  // Fetch dashboard data from backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${buyerUsername}/dashboard`);
        if (!response) {
          throw new Error("Failed to fetch dashboard data");
        }
        const data = response.data;
        setDashboardData(data);
      } catch (err: any) {
        setError(err.message);
        toast.error("Failed to load dashboard data")
      } finally {
        setLoading(false);
      }
    };


    fetchDashboardData();
  }, [buyerUsername, toast]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-[#006A71]" />
      </div>
    );
  }


  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-red-500" />
          <h2 className="text-xl font-semibold mt-4">
            Error loading dashboard
          </h2>
          <p className="text-gray-600 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#006A71] text-white rounded-lg hover:bg-[#005a61] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }


  // Format INR currency
  const formatINR = (amount: any) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("₹", "₹");
  };


  // Icon mapping
  


  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Buyer Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your invoices and payments</p>
      </div>


      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardData?.statsCards?.map((stat, index) => {
          const IconComponent = getIconComponent(stat.iconType);
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">
                    {stat.value}
                  </h3>
                  <p
                    className={`text-sm mt-2 flex items-center ${
                      stat.trend === "up"
                        ? "text-green-600"
                        : stat.trend === "down"
                        ? "text-red-600"
                        : "text-orange-600"
                    }`}
                  >
                    <TrendingUp size={16} className="mr-1" />
                    {stat.subtext}
                  </p>
                </div>
                <div className="bg-[#F2EFE7] p-3 rounded-lg">
                  <IconComponent className="text-[#006A71]" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>


      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Payment Trend Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Payment Trends (Last 6 Months)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dashboardData.paymentHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => formatINR(value).replace("₹", "")}
              />
              <Tooltip
                formatter={(value) => [formatINR(value), "Amount"]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#006A71"
                fill="#006A71"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>


        {/* Payment Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Payment Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData.paymentDistribution}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {dashboardData.paymentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [
                  `${value} (${(props.payload.percent * 100).toFixed(1)}%)`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {dashboardData.paymentDistribution.map((item, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Pending Approvals Table */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Pending Approvals
          </h2>
          <button className="px-4 py-2 bg-[#006A71] text-white rounded-lg hover:bg-[#005a61] transition-colors">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dashboardData.pendingInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.seller}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(invoice.dueDate).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.status}
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default BuyerDashboard;