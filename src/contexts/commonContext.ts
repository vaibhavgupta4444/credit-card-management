import React, { createContext, useState } from "react";
import type { CardData } from "../types/Context";
import type { ExtendedCommonContextType, Transaction } from "../types/ITransactions";
import type { BillHistory } from "../types/IBilling";

export const CommonContext = createContext<ExtendedCommonContextType | null>(null);

function generateTransactions(count = 205): Transaction[] {
  const merchants = ["Amazon India", "Swiggy", "Cash Refund", "BookMyShow", "Uber", "Flipkart", "Zomato", "IRCTC", "BigBasket", "Myntra"];
  const categories = ["Shopping", "Food", "Refund", "Entertainment", "Travel", "Groceries", "Apparel", "Transport", "Utilities"];
  const types: ("debit" | "credit")[] = ["debit", "credit"];
  const txns: Transaction[] = [];
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    txns.push({
      id: i + 1,
      merchant: merchants[i % merchants.length],
      amount: Math.floor(Math.random() * 5000) + 100,
      date: date.toISOString().slice(0, 10),
      category: categories[i % categories.length],
      type: types[i % 2],
    });
  }
  return txns;
}

export const CommonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  const transactions = generateTransactions(205);

 
  const [cards, setCards] = useState<CardData[]>([
    {
      id: 1,
      bank: "HDFC Bank",
      number: "1234 5678 9012 3456",
      name: "Vaibhav Gupta",
      expiry: "12/29",
      limit: 200000,
      used: 75000,
      outstanding: 12000,
      dueDate: "2026-02-10",
      rewards: 3200,
      color: "from-blue-500 to-indigo-600",
      blocked: false,
      onlineEnabled: true,
      intlEnabled: false,
      dailyLimit: 20000,
      monthlyLimit: 100000
    },
    {
      id: 2,
      bank: "SBI Card",
      number: "9876 5432 1098 7654",
      name: "Vaibhav Gupta",
      expiry: "08/28",
      limit: 150000,
      used: 40000,
      outstanding: 8000,
      dueDate: "2026-02-15",
      rewards: 2100,
      color: "from-purple-500 to-pink-500",
      blocked: false,
      onlineEnabled: true,
      intlEnabled: false,
      dailyLimit: 15000,
      monthlyLimit: 80000
    },
  ]);

  const [billHistory, setBillHistory] = useState<BillHistory[]>([
    { id: 1, month: "Jan 2026", amount: 12000, dueDate: "2026-02-10", paidDate: "", status: "pending", minDue: 600 },
    { id: 2, month: "Dec 2025", amount: 18500, dueDate: "2026-01-10", paidDate: "2026-01-08", status: "paid", minDue: 925 },
    { id: 3, month: "Nov 2025", amount: 15200, dueDate: "2025-12-10", paidDate: "2025-12-09", status: "paid", minDue: 760 },
    { id: 4, month: "Oct 2025", amount: 22000, dueDate: "2025-11-10", paidDate: "2025-11-12", status: "overdue", minDue: 1100 },
    { id: 5, month: "Sep 2025", amount: 19800, dueDate: "2025-10-10", paidDate: "2025-10-07", status: "paid", minDue: 990 },
  ]);

  const updateCard = (idx: number, updates: Partial<CardData>) => {
    setCards(prev => prev.map((card, i) => i === idx ? { ...card, ...updates } : card));
  };

  const addBillHistory = (bill: BillHistory) => {
    setBillHistory(prev => [bill, ...prev]);
  };

  return React.createElement(
    CommonContext.Provider,
    { value: { emailPattern, passwordPattern, transactions, cards, updateCard, billHistory, addBillHistory } },
    children
  );
};