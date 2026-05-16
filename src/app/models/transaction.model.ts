export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Salary'
  | 'Freelance'
  | 'Food'
  | 'Transport'
  | 'Housing'
  | 'Entertainment'
  | 'Health'
  | 'Education'
  | 'Other';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string; // ISO string
}
