export interface BillHistory {
  id: number;
  month: string;
  amount: number;
  dueDate: string;
  paidDate: string;
  status: "paid" | "overdue" | "pending";
  minDue: number;
}