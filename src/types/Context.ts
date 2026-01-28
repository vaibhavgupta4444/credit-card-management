export interface CardData {
  id: number;
  bank: string;
  number: string;
  name: string;
  expiry: string;
  limit: number;
  used: number;
  outstanding: number;
  dueDate: string;
  rewards: number;
  color: string;
  // Security fields
  blocked: boolean;
  onlineEnabled: boolean;
  intlEnabled: boolean;
  dailyLimit: number;
  monthlyLimit: number;
}

export interface CommonContextType{
  emailPattern: RegExp;
  passwordPattern: RegExp;
  cards: CardData[];
  updateCard: (idx: number, updates: Partial<CardData>) => void;
}