import { useState, useContext, useMemo, type FC } from "react";
import { CommonContext } from "../contexts/commonContext";
import { CreditCard, Calendar, DollarSign, CheckCircle, Clock, AlertCircle, X, Download } from "lucide-react";
import { useExport } from "../hooks/useExport";
import { toast } from "react-toastify";
import type { BillHistory } from "../types/IBilling";

const BillingPayments: FC = () => {
    const ctx = useContext(CommonContext);
    const cardData = ctx?.cards || [];
    const [selected, setSelected] = useState(0);
    const currentCard = cardData[selected];

    const minAmount = (currentCard?.outstanding || 0) * 0.05;
    const maxAmount = currentCard?.outstanding || 0;

    const billHistory = ctx?.billHistory || [];

    const { handleExportExcel, handleExportPDF } = useExport(billHistory, {
        filename: "billing-history",
        sheetName: "Bills",
        title: "Billing History",
        columns: [
            { header: "ID", key: "id" },
            { header: "Month", key: "month" },
            { header: "Amount", key: "amount", formatter: (val) => `₹${val.toLocaleString()}` },
            { header: "Min Due", key: "minDue", formatter: (val) => `₹${val}` },
            { header: "Due Date", key: "dueDate" },
            { header: "Paid Date", key: "paidDate", formatter: (val) => val || "N/A" },
            { header: "Status", key: "status", formatter: (val) => val.toUpperCase() }
        ]
    });

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentType, setPaymentType] = useState<"minimum" | "full">("full");
    const [paymentAmount, setPaymentAmount] = useState(0);

    const daysUntilDue = useMemo(() => {
        if (!currentCard?.dueDate) return 0;
        const due = new Date(currentCard.dueDate);
        const today = new Date();
        const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diff;
    }, [currentCard?.dueDate]);

    const openPaymentModal = (type: "minimum" | "full") => {
        setPaymentType(type);
        if (type === "full") {
            setPaymentAmount(currentCard?.outstanding || 0);
        } else {
            setPaymentAmount(minAmount);
        }
        setShowPaymentModal(true);
    };

    const handlePayment = () => {
        if (!currentCard || !ctx?.updateCard) return;

        const amount = paymentAmount;
        if (isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }
        const minRequired = currentCard.outstanding * 0.05;
        if (amount < minRequired) {
            toast.error(`Minimum payment of ₹${minRequired.toFixed(0)} is required`);
            return;
        }

        if (amount > currentCard.outstanding) {
            toast.error("Payment amount cannot exceed outstanding balance");
            return;
        }
        
        const newOutstanding = currentCard.outstanding - amount;
        ctx.updateCard(selected, { outstanding: newOutstanding });

        const today = new Date();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const newBill: BillHistory = {
            id: billHistory.length + 1,
            month: `${monthNames[today.getMonth()]} ${today.getFullYear()}`,
            amount: amount,
            dueDate: currentCard.dueDate,
            paidDate: today.toISOString().split('T')[0],
            status: "paid",
            minDue: Math.round(currentCard.outstanding * 0.05)
        };

        ctx.addBillHistory?.(newBill);
        setShowPaymentModal(false);
        setPaymentAmount(0);

        toast.success(`Payment of ₹${amount.toLocaleString()} processed successfully!`);
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
                                className={`relative min-w-95 h-56 rounded-3xl cursor-pointer transition-all duration-300 ${selected === idx
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
                            <button
                                onClick={() => openPaymentModal("minimum")}
                                className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                            >
                                Pay Minimum
                            </button>
                            <button
                                onClick={() => openPaymentModal("full")}
                                className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                            >
                                Pay Full Amount
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Previous Bills</h3>
                        <div className="flex gap-2">
                            <button
                                onClick={handleExportExcel}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors text-sm"
                            >
                                <Download className="w-4 h-4" />
                                Excel
                            </button>
                            <button
                                onClick={handleExportPDF}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm"
                            >
                                <Download className="w-4 h-4" />
                                PDF
                            </button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {billHistory.map((bill) => (
                            <div key={bill.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bill.status === "paid" ? "bg-green-100" : bill.status === "overdue" ? "bg-red-100" : "bg-yellow-100"
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
                                    <span className={`inline-block mt-1 px-2 py-1 rounded text-xs font-semibold ${bill.status === "paid" ? "bg-green-100 text-green-700" :
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

                {/* Payment Modal */}
                {showPaymentModal && (
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-lg flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                {paymentType === "full" ? "Pay Full Amount" : "Make Payment"}
                            </h2>

                            <div className="space-y-4">
                                {/* Card Info */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="text-sm text-gray-500 mb-1">Paying for</div>
                                    <div className="font-semibold text-gray-900">{currentCard?.bank}</div>
                                    <div className="text-sm text-gray-600">•••• {currentCard?.number.slice(-4)}</div>
                                </div>

                                {/* Outstanding Balance */}
                                <div className="bg-blue-50 rounded-xl p-4">
                                    <div className="text-sm text-blue-600 mb-1">Current Outstanding</div>
                                    <div className="text-2xl font-bold text-blue-900">₹{currentCard?.outstanding.toLocaleString()}</div>
                                    {paymentType === "minimum" && (
                                        <div className="text-sm text-blue-600 mt-1">
                                            Minimum Due: ₹{((currentCard?.outstanding || 0) * 0.05).toFixed(0)}
                                        </div>
                                    )}
                                </div>

                                {/* Payment Amount Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Payment Amount
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                                            ₹
                                        </span>
                                        <input
                                            type="number"
                                            value={paymentAmount || ''}
                                            disabled={paymentType === "full"}
                                            onChange={(e) => {
                                                const value = e.target.value === '' ? 0 : Number(e.target.value);
                                                setPaymentAmount(value);
                                            }}
                                            className={`w-full pl-8 pr-4 py-3 border-2 rounded-xl text-lg font-semibold ${paymentType === "full"
                                                    ? "bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed"
                                                    : "border-blue-300 focus:border-blue-500 focus:outline-none"
                                                }`}
                                            placeholder="Enter amount"
                                            min={minAmount}
                                            max={maxAmount}
                                        />
                                    </div>
                                    {paymentType === "minimum" && (
                                        <div className="text-xs text-gray-500 mt-1">
                                            Enter amount between ₹{((currentCard?.outstanding || 0) * 0.05).toFixed(0)} and ₹{currentCard?.outstanding.toLocaleString()}
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => setShowPaymentModal(false)}
                                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handlePayment}
                                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        Pay Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BillingPayments;
