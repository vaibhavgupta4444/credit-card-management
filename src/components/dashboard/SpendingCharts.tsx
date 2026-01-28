import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { PieChart, Activity } from "lucide-react";
import type { FC } from "react";
import type { SpendingChartsProps } from "../../types/ICharts";


const SpendingCharts: FC<SpendingChartsProps> = ({ spendingByCategory, monthlySpending }) => (
  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
    {/* Spending by Category */}
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-1">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <PieChart className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Spending by Category</h3>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <RechartsPie>
          <Pie
            data={spendingByCategory}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {spendingByCategory.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value?: number) => value == null ? '-' : `₹${value.toLocaleString()}`}
            contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          />
        </RechartsPie>
      </ResponsiveContainer>
      <div className="space-y-2 mt-4">
        {spendingByCategory.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-gray-600">{item.name}</span>
            </div>
            <span className="font-semibold text-gray-900">₹{(item.value / 1000).toFixed(0)}K</span>
          </div>
        ))}
      </div>
    </div>

    {/* Monthly Spending Trend */}
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <Activity className="w-5 h-5 text-indigo-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">6-Month Spending Trend</h3>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={monthlySpending}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            stroke="#9ca3af"
            style={{ fontSize: "12px" }}
          />
          <YAxis 
            stroke="#9ca3af"
            style={{ fontSize: "12px" }}
            tickFormatter={(value) => `₹${value / 1000}K`}
          />
          <Tooltip 
            formatter={(value?: number) => value == null ? '-' : `₹${value.toLocaleString()} spent`}
            contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#6366f1" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorAmount)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default SpendingCharts;
