import { useState, useContext, type FC } from "react";
import { CommonContext } from "../contexts/commonContext";
import { CreditCard, Gift, TrendingUp, ShoppingBag, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import type { RedemptionHistory } from "../types/IRedeem";

const RewardsCashback: FC = () => {
  const ctx = useContext(CommonContext);
  const cardData = ctx?.cards || [];
  const redemptionHistory = ctx?.redemptionHistory || [];
  const [selected, setSelected] = useState(0);
  const currentCard = cardData[selected];

  const monthlyRewards = [
    { month: "Jan", points: 450 },
    { month: "Dec", points: 380 },
    { month: "Nov", points: 520 },
    { month: "Oct", points: 420 },
    { month: "Sep", points: 490 },
  ];

  const totalCashback = 2450;

  const handleRedeem = (pointsRequired: number, rewardName: string) => {
    if (!currentCard || !ctx?.updateCard || !ctx?.addRedemption) return;
    
    if (currentCard.rewards >= pointsRequired) {
      // Deduct points
      ctx.updateCard(selected, { rewards: currentCard.rewards - pointsRequired });
      
      // Add redemption to history
      const newRedemption: RedemptionHistory = {
        id: redemptionHistory.length + 1,
        date: new Date().toISOString().split('T')[0],
        description: `Redeemed for ${rewardName}`,
        points: -pointsRequired,
        type: "redeemed"
      };
      ctx.addRedemption(newRedemption);
      
      toast.success(`Successfully redeemed ${pointsRequired} points for ${rewardName}!`);
    } else {
      toast.error(`Insufficient points! You need ${pointsRequired} points but have ${currentCard.rewards} points.`);
    }
  };

  if (!cardData.length) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
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

        {/* Rewards Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-xl">
                <Gift className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-yellow-500 text-sm font-semibold">Available</span>
            </div>
            <div className="text-gray-500 text-sm mb-1">Total Reward Points</div>
            <div className="text-3xl font-bold text-gray-900">{currentCard?.rewards.toLocaleString()} pts</div>
            <div className="text-xs text-gray-500 mt-4">Redeem anytime</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-green-500 text-sm font-semibold">+15%</span>
            </div>
            <div className="text-gray-500 text-sm mb-1">Total Cashback Earned</div>
            <div className="text-3xl font-bold text-gray-900">₹{totalCashback.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-4">This year</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-purple-500 text-sm font-semibold">This Month</span>
            </div>
            <div className="text-gray-500 text-sm mb-1">Points Earned</div>
            <div className="text-3xl font-bold text-gray-900">{monthlyRewards[0].points} pts</div>
            <div className="text-xs text-gray-500 mt-4">Keep spending to earn more!</div>
          </div>
        </div>

        {/* Redeem Rewards Section */}
        <div className="bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Redeem Your Rewards</h3>
              <p className="text-purple-100 text-sm">Convert your points into cashback, vouchers, or statement credits</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Gift Vouchers
              </button>
              <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors flex items-center gap-2">
                Statement Credit
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-400">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs text-gray-500">500 pts</span>
            </div>
            <div className="font-semibold text-gray-900 mb-2">Amazon Voucher</div>
            <div className="text-sm text-gray-500 mb-4">₹500 Gift Card</div>
            <button 
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleRedeem(500, "Amazon Voucher")}
              disabled={!currentCard || currentCard.rewards < 500}
            >
              Redeem Now
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-green-400">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <Gift className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs text-gray-500">1000 pts</span>
            </div>
            <div className="font-semibold text-gray-900 mb-2">Flipkart Voucher</div>
            <div className="text-sm text-gray-500 mb-4">₹1000 Gift Card</div>
            <button 
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleRedeem(1000, "Flipkart Voucher")}
              disabled={!currentCard || currentCard.rewards < 1000}
            >
              Redeem Now
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-orange-400">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-xs text-gray-500">300 pts</span>
            </div>
            <div className="font-semibold text-gray-900 mb-2">Statement Credit</div>
            <div className="text-sm text-gray-500 mb-4">₹300 Credit</div>
            <button 
              className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleRedeem(300, "Statement Credit")}
              disabled={!currentCard || currentCard.rewards < 300}
            >
              Redeem Now
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Redemption History</h3>
          <div className="space-y-4">
            {redemptionHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    item.type === "earned" ? "bg-green-100" : "bg-red-100"
                  }`}>
                    {item.type === "earned" ? (
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    ) : (
                      <Gift className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{item.description}</div>
                    <div className="text-sm text-gray-500">{item.date}</div>
                  </div>
                </div>
                <div className={`text-lg font-bold ${
                  item.type === "earned" ? "text-green-600" : "text-red-600"
                }`}>
                  {item.points > 0 ? "+" : ""}{item.points} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsCashback;
