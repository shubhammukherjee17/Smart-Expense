export interface Person {
  id: string;
  name: string;
  email?: string;
  upiId?: string;
}

export interface ExpenseSplit {
  personId: string;
  amount: number;
  percentage: number;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  paidBy: string;
  splits: ExpenseSplit[];
  date: Date;
  groupId: string;
}

export interface Group {
  id: string;
  name: string;
  members: Person[];
  createdAt: Date;
  type: GroupType;
}

export type GroupType = 'roommates' | 'trip' | 'hostel' | 'general';

export type ExpenseCategory =
  | 'rent'
  | 'food'
  | 'utilities'
  | 'transportation'
  | 'entertainment'
  | 'other';

export interface Settlement {
  from: string;
  to: string;
  amount: number;
}

export interface UserBalance {
  personId: string;
  personName: string;
  balance: number; // positive = owed to, negative = owes
}
