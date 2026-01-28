export interface RedemptionHistory {
  id: number;
  date: string;
  description: string;
  points: number;
  type: "redeemed" | "earned";
}