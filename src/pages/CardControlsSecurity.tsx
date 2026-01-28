import { useState, useContext, type FC } from "react";
import { CommonContext } from "../contexts/commonContext";
import { CreditCard } from "lucide-react";
import type { CardData } from "../types/Context";

const CardControlsSecurity: FC = () => {
  const ctx = useContext(CommonContext);
  const cardData = ctx?.cards || [];
  const [selected, setSelected] = useState(0);
  
  const currentCard = cardData[selected];

  const updateSecurity = (updates: Partial<CardData>) => {
    if (ctx?.updateCard && currentCard) {
      ctx.updateCard(selected, updates);
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
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${c.blocked ? 'bg-gray-400 opacity-50' : `${c.color} opacity-90`}`} />
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

        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-lg">Block Card</div>
              <div className="text-gray-500 text-sm">Temporarily block or unblock your card for safety.</div>
            </div>
            <button
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-200 ${currentCard?.blocked ? "bg-red-500" : "bg-green-400"}`}
              onClick={() => updateSecurity({ blocked: !currentCard?.blocked })}
              aria-pressed={currentCard?.blocked}
            >
              <span
                className={`h-6 w-6 bg-white rounded-full shadow transform transition-transform duration-200 ${currentCard?.blocked ? "translate-x-6" : "translate-x-0"}`}
              />
            </button>
        </div>

    
        <div>
            <div className="font-semibold text-lg mb-2">Spending Limits</div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="text-gray-600">Daily Limit</label>
                <input
                  type="number"
                  min={0}
                  className="border rounded px-3 py-1 w-32 text-right"
                  value={currentCard?.dailyLimit || 0}
                  onChange={e => updateSecurity({ dailyLimit: Number(e.target.value) })}
                  disabled={currentCard?.blocked}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-600">Monthly Limit</label>
                <input
                  type="number"
                  min={0}
                  className="border rounded px-3 py-1 w-32 text-right"
                  value={currentCard?.monthlyLimit || 0}
                  onChange={e => updateSecurity({ monthlyLimit: Number(e.target.value) })}
                  disabled={currentCard?.blocked}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Enable Online Usage</div>
                <div className="text-gray-500 text-sm">Allow card for online transactions.</div>
              </div>
              <button
                className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-200 ${currentCard?.onlineEnabled ? "bg-green-400" : "bg-gray-300"}`}
                onClick={() => updateSecurity({ onlineEnabled: !currentCard?.onlineEnabled })}
                aria-pressed={currentCard?.onlineEnabled}
                disabled={currentCard?.blocked}
              >
                <span
                  className={`h-6 w-6 bg-white rounded-full shadow transform transition-transform duration-200 ${currentCard?.onlineEnabled ? "translate-x-6" : "translate-x-0"}`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Enable International Usage</div>
                <div className="text-gray-500 text-sm">Allow card for international transactions.</div>
              </div>
              <button
                className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-200 ${currentCard?.intlEnabled ? "bg-green-400" : "bg-gray-300"}`}
                onClick={() => updateSecurity({ intlEnabled: !currentCard?.intlEnabled })}
                aria-pressed={currentCard?.intlEnabled}
                disabled={currentCard?.blocked}
              >
                <span
                  className={`h-6 w-6 bg-white rounded-full shadow transform transition-transform duration-200 ${currentCard?.intlEnabled ? "translate-x-6" : "translate-x-0"}`}
                />
              </button>
            </div>
          </div>

          {/* Card Replacement */}
          <div className="pt-4 border-t">
            <div className="font-semibold text-lg mb-2">Card Replacement</div>
            <div className="text-gray-500 text-sm mb-3">Lost or damaged card? Request a replacement easily.</div>
            <button
              className="px-5 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
              disabled={currentCard?.blocked}
            >
              Request Card Replacement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardControlsSecurity;
