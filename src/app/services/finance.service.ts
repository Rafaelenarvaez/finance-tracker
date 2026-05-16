import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Transaction } from '../models/transaction.model';

const STORAGE_KEY = 'finance_tracker_transactions';

@Injectable({ providedIn: 'root' })
export class FinanceService {
  private transactions$ = new BehaviorSubject<Transaction[]>(this.loadFromStorage());

  getTransactions(): Observable<Transaction[]> {
    return this.transactions$.asObservable();
  }

  getBalance(): Observable<number> {
    return this.transactions$.pipe(
      map(txs => txs.reduce((acc, t) =>
        t.type === 'income' ? acc + t.amount : acc - t.amount, 0))
    );
  }

  getTotalIncome(): Observable<number> {
    return this.transactions$.pipe(
      map(txs => txs.filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0))
    );
  }

  getTotalExpenses(): Observable<number> {
    return this.transactions$.pipe(
      map(txs => txs.filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0))
    );
  }

  getMonthlyData(): Observable<{ month: string; income: number; expense: number }[]> {
    return this.transactions$.pipe(
      map(txs => {
        const map: Record<string, { income: number; expense: number }> = {};
        txs.forEach(t => {
          const month = t.date.slice(0, 7); // YYYY-MM
          if (!map[month]) map[month] = { income: 0, expense: 0 };
          if (t.type === 'income') map[month].income += t.amount;
          else map[month].expense += t.amount;
        });
        return Object.entries(map)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([month, data]) => ({ month, ...data }));
      })
    );
  }

  addTransaction(transaction: Omit<Transaction, 'id'>): void {
    const current = this.transactions$.getValue();
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID()
    };
    const updated = [newTransaction, ...current];
    this.transactions$.next(updated);
    this.saveToStorage(updated);
  }

  deleteTransaction(id: string): void {
    const updated = this.transactions$.getValue().filter(t => t.id !== id);
    this.transactions$.next(updated);
    this.saveToStorage(updated);
  }

  private loadFromStorage(): Transaction[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : this.getSeedData();
    } catch {
      return this.getSeedData();
    }
  }

  private saveToStorage(transactions: Transaction[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }

  private getSeedData(): Transaction[] {
    const today = new Date().toISOString().slice(0, 10);
    return [
      { id: '1', description: 'Monthly Salary', amount: 2500, type: 'income', category: 'Salary', date: today },
      { id: '2', description: 'Freelance Project', amount: 800, type: 'income', category: 'Freelance', date: today },
      { id: '3', description: 'Rent', amount: 900, type: 'expense', category: 'Housing', date: today },
      { id: '4', description: 'Groceries', amount: 150, type: 'expense', category: 'Food', date: today },
      { id: '5', description: 'Gym', amount: 40, type: 'expense', category: 'Health', date: today },
    ];
  }
}
