export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  amount: number;
}

export interface SpendingChartsProps {
  spendingByCategory: CategoryData[];
  monthlySpending: MonthlyData[];
}