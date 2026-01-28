import type { CommonContextType } from "./Context";
import type { BillHistory } from "./IBilling";
import type { RedemptionHistory } from "./IRedeem";

export interface TransactionsTableProps {
  transactions: Transaction[];
  page: number;
  pageSize: number;
  search: string;
  filterType: string;
  filterCategory: string;
  onPageChange: (page: number) => void;
}

export interface Transaction {
  id: number;
  merchant: string;
  amount: number;
  date: string;
  category: string;
  type: "debit" | "credit";
}

export interface ExtendedCommonContextType extends CommonContextType {
  transactions: Transaction[];
  billHistory: BillHistory[];
  addBillHistory: (bill: BillHistory) => void;
  redemptionHistory: RedemptionHistory[];
  addRedemption: (redemption: RedemptionHistory) => void;
}

export interface RecentTransactionsProps {
  transactions: Transaction[];
  title?: string;
}