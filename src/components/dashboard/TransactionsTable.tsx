import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useMemo } from "react";
import type { TransactionsTableProps } from "../../types/ITransactions";



const TransactionsTable = ({
  transactions,
  page,
  pageSize,
  search,
  filterType,
  filterCategory,
  onPageChange,
}: TransactionsTableProps) => {
  const filtered = useMemo(() => {
    let txns = transactions;
    if (search) {
      txns = txns.filter(
        (t) =>
          t.merchant.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filterType) {
      txns = txns.filter((t) => t.type === filterType);
    }
    if (filterCategory) {
      txns = txns.filter((t) => t.category === filterCategory);
    }
    return txns;
  }, [transactions, search, filterType, filterCategory]);


  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr >
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Merchant</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((txn, idx) => (
            <tr key={txn.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{(page - 1) * pageSize + idx + 1}</td>
              <td className="p-2 font-medium flex items-center gap-2">
                {txn.type === "credit" ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-blue-600" />
                )}
                {txn.merchant}
              </td>
              <td className="p-2">{txn.category}</td>
              <td className="p-2">{txn.date}</td>
              <td className="p-2 capitalize">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${txn.type === "credit" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{txn.type}</span>
              </td>
              <td className="p-2 font-bold {txn.type === 'credit' ? 'text-green-600' : 'text-gray-900' }">
                {txn.type === "credit" ? "+" : "-"}₹{txn.amount.toLocaleString()}
              </td>
            </tr>
          ))}
          {paginated.length === 0 && (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-400">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, total)} of {total}
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="px-2">Page {page} of {totalPages}</span>
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
