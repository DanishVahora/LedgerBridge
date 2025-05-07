import { ArrowUpRight, TrendingUp, Clock, DollarSign } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon?: React.ReactNode;
}

const StatCard = ({ title, value, subValue, icon }: StatCardProps) => (
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-[#006A71]/10 rounded-lg">
        {icon || <TrendingUp size={20} className="text-[#006A71]" />}
      </div>
      <ArrowUpRight size={20} className="text-gray-400" />
    </div>
    <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-semibold text-gray-800">{value}</p>
    {subValue && (
      <p className="text-sm text-gray-500 mt-2">{subValue}</p>
    )}
  </div>
);

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard
        title="Total Amount Financed"
        value="₹ 2,54,16,789.00"
        subValue="Count: 5"
        icon={<DollarSign size={20} className="text-[#006A71]" />}
      />
      <StatCard
        title="Average Interest Rate"
        value="0%"
        subValue="Last month: 6.5%"
        icon={<TrendingUp size={20} className="text-[#006A71]" />}
      />
      <StatCard
        title="Awaiting Bids"
        value="₹ 0.00"
        subValue="Count: 0"
        icon={<Clock size={20} className="text-[#006A71]" />}
      />
      <StatCard
        title="Pending Acceptance"
        value="₹ 0.00"
        subValue="Count: 0"
        icon={<Clock size={20} className="text-[#006A71]" />}
      />
    </div>
  );
};

export default DashboardStats;