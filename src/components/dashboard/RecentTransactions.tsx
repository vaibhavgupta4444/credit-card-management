
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { FC } from "react";
import type { Transaction } from "../../types/ITransactions";

interface RecentTransactionsProps {
  transactions: Transaction[];
  title?: string;
}

const RecentTransactions: FC<RecentTransactionsProps> = ({ transactions, title = "Recent Transactions" }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2">
    <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
    <div className="space-y-3">
      {transactions.map((txn) => (
        <div key={txn.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              txn.type === "credit" ? "bg-green-100" : "bg-blue-100"
            }`}>
              {txn.type === "credit" ? (
                <ArrowUpRight className="w-6 h-6 text-green-600" />
              ) : (
                <ArrowDownRight className="w-6 h-6 text-blue-600" />
              )}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{txn.merchant}</div>
              <div className="text-sm text-gray-500">{txn.category} • {txn.date}</div>
            </div>
          </div>
          <div className={`text-lg font-bold ${
            txn.type === "credit" ? "text-green-600" : "text-gray-900"
          }`}>
            {txn.type === "credit" ? "+" : "-"}₹{txn.amount.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentTransactions;
