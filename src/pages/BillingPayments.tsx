import { useState, useContext, useMemo } from "react";
import { CommonContext } from "../contexts/commonContext";
import { CreditCard, Calendar, DollarSign, CheckCircle, Clock, AlertCircle } from "lucide-react";
import type { BillHistory } from "../types/IBilling";

const BillingPayments = () => {
  const ctx = useContext(CommonContext);
  const cardData = ctx?.cards || [];
  const [selected, setSelected] = useState(0);
  const currentCard = cardData[selected];

  const billHistory: BillHistory[] = [
    { id: 1, month: "Jan 2026", amount: 12000, dueDate: "2026-02-10", paidDate: "", status: "pending", minDue: 600 },
    { id: 2, month: "Dec 2025", amount: 18500, dueDate: "2026-01-10", paidDate: "2026-01-08", status: "paid", minDue: 925 },
    { id: 3, month: "Nov 2025", amount: 15200, dueDate: "2025-12-10", paidDate: "2025-12-09", status: "paid", minDue: 760 },
    { id: 4, month: "Oct 2025", amount: 22000, dueDate: "2025-11-10", paidDate: "2025-11-12", status: "overdue", minDue: 1100 },
    { id: 5, month: "Sep 2025", amount: 19800, dueDate: "2025-10-10", paidDate: "2025-10-07", status: "paid", minDue: 990 },
  ];

  // Calculate days until due
  const daysUntilDue = useMemo(() => {
    if (!currentCard?.dueDate) return 0;
    const due = new Date(currentCard.dueDate);
    const today = new Date();
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  }, [currentCard?.dueDate]);

  if (!cardData.length) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* <h1 className="text-2xl font-bold text-blue-700">Billing & Payments</h1> */}

        {/* Scrollable Cards */}
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

        {/* Current Bill Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-red-100 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-red-500 text-sm font-semibold">Due</span>
            </div>
            <div className="text-gray-500 text-sm mb-1">Current Bill Amount</div>
            <div className="text-3xl font-bold text-gray-900">₹{currentCard?.outstanding.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-4">Total amount outstanding</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-orange-500 text-sm font-semibold">Minimum</span>
            </div>
            <div className="text-gray-500 text-sm mb-1">Minimum Due</div>
            <div className="text-3xl font-bold text-gray-900">₹{((currentCard?.outstanding || 0) * 0.05).toFixed(0)}</div>
            <div className="text-xs text-gray-500 mt-4">5% of total outstanding</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`${daysUntilDue <= 7 ? 'bg-red-100' : 'bg-purple-100'} p-3 rounded-xl`}>
                <Calendar className={`w-6 h-6 ${daysUntilDue <= 7 ? 'text-red-600' : 'text-purple-600'}`} />
              </div>
              <span className={`${daysUntilDue <= 7 ? 'text-red-500' : 'text-purple-500'} text-sm font-semibold`}>
                {daysUntilDue} days
              </span>
            </div>
            <div className="text-gray-500 text-sm mb-1">Due Date</div>
            <div className="text-2xl font-bold text-gray-900">{currentCard?.dueDate}</div>
            <div className="text-xs text-gray-500 mt-4">
              {daysUntilDue <= 7 ? 'Payment due soon!' : 'Payment deadline'}
            </div>
          </div>
        </div>

        {/* Payment Action */}
        <div className="bg-linear-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Make a Payment</h3>
              <p className="text-blue-100 text-sm">Pay your bill before the due date to avoid late fees</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                Pay Minimum
              </button>
              <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                Pay Full Amount
              </button>
            </div>
          </div>
        </div>

        {/* Previous Bills History */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Previous Bills</h3>
          <div className="space-y-4">
            {billHistory.map((bill) => (
              <div key={bill.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    bill.status === "paid" ? "bg-green-100" : bill.status === "overdue" ? "bg-red-100" : "bg-yellow-100"
                  }`}>
                    {bill.status === "paid" ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : bill.status === "overdue" ? (
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    ) : (
                      <Clock className="w-6 h-6 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{bill.month}</div>
                    <div className="text-sm text-gray-500">
                      Due: {bill.dueDate} {bill.status === "paid" && `• Paid: ${bill.paidDate}`}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">₹{bill.amount.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Min: ₹{bill.minDue}</div>
                  <span className={`inline-block mt-1 px-2 py-1 rounded text-xs font-semibold ${
                    bill.status === "paid" ? "bg-green-100 text-green-700" : 
                    bill.status === "overdue" ? "bg-red-100 text-red-700" : 
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {bill.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPayments;
