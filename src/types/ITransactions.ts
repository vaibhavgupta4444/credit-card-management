import type { CommonContextType } from "./Context";

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
}