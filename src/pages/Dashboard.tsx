import type { FC } from "react";
import { useState, useContext, useEffect } from "react";
import { CreditCard, Gift, Calendar, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Shield } from "lucide-react";
import SpendingCharts from "../components/dashboard/SpendingCharts";
import QuickActions from "../components/dashboard/QuickActions";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { CommonContext } from "../contexts/commonContext";

const Dashboard: FC = () => {
  const ctx = useContext(CommonContext);
  const cardData = ctx?.cards || [];
  const transactions = ctx?.transactions || [];
  const [selected, setSelected] = useState(0);
  const card = cardData[selected] || cardData[0];
  const utilizationPercent = card ? ((card.used / card.limit) * 100).toFixed(1) : "0";
  const recentTransactions = transactions
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  useEffect(() => {
    if (cardData.length > 0 && selected >= cardData.length && cardData[0].blocked === false) {
      setSelected(0);
    }else if (cardData.length > 0 && cardData[selected]?.blocked) {
      const firstUnblockedIndex = cardData.findIndex(c => !c.blocked);
      setSelected(firstUnblockedIndex !== -1 ? firstUnblockedIndex : 0);
    } 
  }, [cardData, selected]);

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
            {cardData.map((c, idx) => ( !c.blocked &&
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
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${c.blocked ? 'bg-gray-400 opacity-50' : `${c.color} opacity-90` } `} />
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

        {/* Spending Limits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-xs text-gray-500">Security</span>
            </div>
            <div className="text-gray-500 text-sm mb-1">Daily Spending Limit</div>
            <div className="text-3xl font-bold text-gray-900">₹{(card?.dailyLimit || 0).toLocaleString()}</div>
            <div className="mt-4 w-full bg-gray-100 rounded-full h-2.5">
              <div
                className="bg-linear-to-r from-orange-500 to-orange-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((card.used / card.dailyLimit) * 100, 100)}%` }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-2">Updated from Card Controls</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-teal-100 p-3 rounded-xl">
                <Shield className="w-6 h-6 text-teal-600" />
              </div>
              <span className="text-xs text-gray-500">Security</span>
            </div>
            <div className="text-gray-500 text-sm mb-1">Monthly Spending Limit</div>
            <div className="text-3xl font-bold text-gray-900">₹{(card?.monthlyLimit || 0).toLocaleString()}</div>
            <div className="mt-4 w-full bg-gray-100 rounded-full h-2.5">
              <div
                className="bg-linear-to-r from-teal-500 to-teal-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((card.used / card.monthlyLimit) * 100, 100)}%` }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-2">Updated from Card Controls</div>
          </div>
        </div>


        <SpendingCharts />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RecentTransactions transactions={recentTransactions} />
          <QuickActions card={card} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;