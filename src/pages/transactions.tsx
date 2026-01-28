import { useContext, useState, useMemo } from "react";
import { CommonContext } from "../contexts/commonContext";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const PAGE_SIZE = 12;

const Transactions = () => {
    const ctx = useContext(CommonContext);
    const transactions = ctx?.transactions || [];
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [page, setPage] = useState(1);

    // Get unique categories for filter dropdown
    const categories = useMemo(() => Array.from(new Set(transactions.map((t) => t.category))), [transactions]);

    // Filtered transactions
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

    // Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / PAGE_SIZE);
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filtered);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
        XLSX.writeFile(workbook, "transactions.xlsx");
    };

    // Export to PDF
    const handleExportPDF = () => {
        const doc = new jsPDF();

        const tableBody = filtered.map(t => [
            t.id,
            t.merchant,
            t.category,
            t.date,
            t.type,
            t.amount,
        ]);

        autoTable(doc, {
            head: [["#", "Merchant", "Category", "Date", "Type", "Amount"]],
            body: tableBody,
        });

        doc.save("transactions.pdf");
    };

    return (
        <div className="mx-auto py-8 px-4 bg-white">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search merchant or category..."
                        className="border rounded px-3 py-3 w-full md:w-64 text-base"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    />
                    <div className="relative w-full md:w-auto">
                        <select
                            className="border rounded px-3 py-3 w-full text-base pr-8"
                            value={filterType}
                            onChange={(e) => { setFilterType(e.target.value); setPage(1); }}
                        >
                            <option value="">All Types</option>
                            <option value="debit">Debit</option>
                            <option value="credit">Credit</option>
                        </select>
        
                    </div>
                    <div className="relative w-full md:w-auto">
                        <select
                            className="border rounded px-3 py-3 w-full text-base pr-8"
                            value={filterCategory}
                            onChange={(e) => { setFilterCategory(e.target.value); setPage(1); }}
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
    
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700"
                        onClick={handleExportExcel}
                    >
                        Export to Excel
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
                        onClick={handleExportPDF}
                    >
                        Export to PDF
                    </button>
                </div>
            </div>
            <RecentTransactions transactions={paginated} title="All Transactions" />
            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-600">
                    Showing {(page - 1) * PAGE_SIZE + 1} - {Math.min(page * PAGE_SIZE, total)} of {total}
                </div>
                <div className="flex gap-2">
                    <button
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Prev
                    </button>
                    <span className="px-2">Page {page} of {totalPages}</span>
                    <button
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Transactions;