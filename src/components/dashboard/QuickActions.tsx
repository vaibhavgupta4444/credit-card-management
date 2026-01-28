import { DollarSign, Gift, Activity, Shield } from "lucide-react";
import type { FC } from "react";

const QuickActions: FC = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
    <div className="space-y-3">
      <button className="w-full flex items-center gap-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-4 rounded-xl font-semibold shadow-lg transition-all hover:shadow-xl">
        <DollarSign className="w-5 h-5" />
        <span>Pay Bill</span>
      </button>
      <button className="w-full flex items-center gap-3 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-4 rounded-xl font-semibold shadow-lg transition-all hover:shadow-xl">
        <Gift className="w-5 h-5" />
        <span>Redeem Rewards</span>
      </button>
      <button className="w-full flex items-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-4 rounded-xl font-semibold transition-all">
        <Activity className="w-5 h-5" />
        <span>View Statement</span>
      </button>
      <button className="w-full flex items-center gap-3 bg-red-50 hover:bg-red-100 text-red-600 px-5 py-4 rounded-xl font-semibold transition-all">
        <Shield className="w-5 h-5" />
        <span>Block Card</span>
      </button>
    </div>
  </div>
);

export default QuickActions;
