import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { month: 'Dec 2024', amount: 800000, rate: 6.5 },
  { month: 'Feb 2025', amount: 500000, rate: 8.0 },
  { month: 'Mar 2025', amount: 500000, rate: 6.2 },
  { month: 'Apr 2025', amount: 750000, rate: 6.5 },
];

const FinanceChart = () => {
  const [view, setView] = useState<'Monthly' | 'Quarterly' | 'Yearly'>('Monthly');

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Amount Financed Graph</h2>
        <select 
          value={view}
          onChange={(e) => setView(e.target.value as any)}
          className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
          <option>Monthly</option>
          <option>Quarterly</option>
          <option>Yearly</option>
        </select>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Bar yAxisId="left" dataKey="amount" fill="#006A71" name="Amount (₹)" />
            <Bar yAxisId="right" dataKey="rate" fill="#94A3B8" name="Rate (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceChart;