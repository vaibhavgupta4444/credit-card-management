import type { FC } from "react";
import { useState } from "react";
import { CreditCard, Gift, Calendar, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import SpendingCharts from "../components/dashboard/SpendingCharts";
import QuickActions from "../components/dashboard/QuickActions";
import RecentTransactions from "../components/dashboard/RecentTransactions";

const cardData = [
  {
    id: 1,
    bank: "HDFC Bank",
    number: "1234 5678 9012 3456",
    name: "Vaibhav Sharma",
    expiry: "12/29",
    limit: 200000,
    used: 75000,
    outstanding: 12000,
    dueDate: "2026-02-10",
    rewards: 3200,
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: 2,
    bank: "SBI Card",
    number: "9876 5432 1098 7654",
    name: "Vaibhav Sharma",
    expiry: "08/28",
    limit: 150000,
    used: 40000,
    outstanding: 8000,
    dueDate: "2026-02-15",
    rewards: 2100,
    color: "from-purple-500 to-pink-500"
  },
];

const spendingByCategory = [
  { name: "Shopping", value: 25000, color: "#3b82f6" },
  { name: "Food & Dining", value: 18000, color: "#10b981" },
  { name: "Travel", value: 15000, color: "#f59e0b" },
  { name: "Entertainment", value: 10000, color: "#8b5cf6" },
  { name: "Utilities", value: 7000, color: "#ef4444" },
];

const monthlySpending = [
  { month: "Aug", amount: 45000 },
  { month: "Sep", amount: 52000 },
  { month: "Oct", amount: 48000 },
  { month: "Nov", amount: 61000 },
  { month: "Dec", amount: 55000 },
  { month: "Jan", amount: 75000 },
];

const recentTransactions: {
  id: number;
  merchant: string;
  amount: number;
  date: string;
  category: string;
  type: "debit" | "credit";
}[] = [
  { id: 1, merchant: "Amazon India", amount: 2499, date: "Jan 27", category: "Shopping", type: "debit" },
  { id: 2, merchant: "Swiggy", amount: 850, date: "Jan 26", category: "Food", type: "debit" },
  { id: 3, merchant: "Cash Refund", amount: 1200, date: "Jan 25", category: "Refund", type: "credit" },
  { id: 4, merchant: "BookMyShow", amount: 600, date: "Jan 24", category: "Entertainment", type: "debit" },
  { id: 5, merchant: "Uber", amount: 340, date: "Jan 23", category: "Travel", type: "debit" },
];

const Dashboard: FC = () => {
  const [selected, setSelected] = useState(0);
  const card = cardData[selected];
  const utilizationPercent = ((card.used / card.limit) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-end">
          <div className="bg-white rounded-2xl shadow-lg px-6 py-3 flex items-center gap-3 w-fit">
            <Gift className="w-6 h-6 text-yellow-500" />
            <div>
              <div className="text-sm text-gray-500">Total Rewards</div>
              <div className="text-xl font-bold text-gray-900">{card.rewards} pts</div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-fit">
            {cardData.map((c, idx) => (
              <div
                key={c.id}
                className={`relative min-w-95 h-56 rounded-3xl cursor-pointer transition-all duration-300 ${
                  selected === idx 
                    ? "scale-105 shadow-2xl ring-4 ring-blue-400/50" 
                    : "shadow-lg hover:shadow-xl hover:scale-102"
                }`}
                onClick={() => setSelected(idx)}
                style={{ flex: "0 0 380px" }}
              >
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${c.color} opacity-90`} />
                <div className="absolute inset-0 rounded-3xl backdrop-blur-3xl bg-white/10" />
                
                <div className="relative z-10 h-full flex flex-col justify-between p-7 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm opacity-80">Bank</div>
                      <div className="text-xl font-bold tracking-wide">{c.bank}</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                      <CreditCard className="w-7 h-7" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-mono tracking-[0.3em] mb-6">{c.number}</div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs opacity-80 uppercase">Card Holder</div>
                        <div className="font-semibold text-lg">{c.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs opacity-80 uppercase">Valid Thru</div>
                        <div className="font-semibold text-lg">{c.expiry}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-green-500 text-sm font-semibold flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" />
                {utilizationPercent}%
              </span>
            </div>
            <div className="text-gray-500 text-sm mb-1">Credit Limit</div>
            <div className="text-3xl font-bold text-gray-900">₹{(card.limit / 1000).toFixed(0)}K</div>
            <div className="mt-4 w-full bg-gray-100 rounded-full h-2.5">
              <div
                className="bg-linear-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${utilizationPercent}%` }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-2">₹{card.used.toLocaleString()} used</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-red-500 text-sm font-semibold flex items-center gap-1">
                <ArrowDownRight className="w-4 h-4" />
                Due
              </span>
            </div>
            <div className="text-gray-500 text-sm mb-1">Outstanding</div>
            <div className="text-3xl font-bold text-gray-900">₹{(card.outstanding / 1000).toFixed(1)}K</div>
            <div className="text-xs text-gray-500 mt-4">Minimum: ₹{(card.outstanding * 0.05).toFixed(0)}</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-orange-500 text-sm font-semibold">13 days</span>
            </div>
            <div className="text-gray-500 text-sm mb-1">Due Date</div>
            <div className="text-2xl font-bold text-gray-900">{card.dueDate}</div>
            <div className="text-xs text-gray-500 mt-4">Payment due soon</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-green-500 text-sm font-semibold">+12%</span>
            </div>
            <div className="text-gray-500 text-sm mb-1">This Month</div>
            <div className="text-3xl font-bold text-gray-900">₹{(card.used / 1000).toFixed(0)}K</div>
            <div className="text-xs text-gray-500 mt-4">vs last month ₹67K</div>
          </div>
        </div>

        {/* Charts Section */}
        <SpendingCharts spendingByCategory={spendingByCategory} monthlySpending={monthlySpending} />

        {/* Recent Transactions & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RecentTransactions transactions={recentTransactions} />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;