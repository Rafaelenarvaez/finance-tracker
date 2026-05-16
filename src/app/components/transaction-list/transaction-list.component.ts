import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/transaction.model';
import { FinanceService } from '../../services/finance.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transaction-list',
  template: `
    <div class="header-row">
      <h2>Transactions</h2>
      <a mat-raised-button color="primary" routerLink="/add">
        <mat-icon>add</mat-icon> New
      </a>
    </div>

    <mat-card>
      <mat-list>
        <mat-list-item
          *ngFor="let t of transactions$ | async"
          class="transaction-item">
          <mat-icon matListItemIcon [class]="t.type">
            {{ t.type === 'income' ? 'arrow_upward' : 'arrow_downward' }}
          </mat-icon>
          <div matListItemTitle>{{ t.description }}</div>
          <div matListItemLine>{{ t.category }} · {{ t.date }}</div>
          <span class="amount" [class]="t.type" matListItemMeta>
            {{ t.type === 'income' ? '+' : '-' }}{{ t.amount | currency:'USD' }}
          </span>
          <button mat-icon-button color="warn" (click)="delete(t)" matListItemMeta>
            <mat-icon>delete</mat-icon>
          </button>
        </mat-list-item>

        <p *ngIf="(transactions$ | async)?.length === 0" class="empty">
          No transactions yet. <a routerLink="/add">Add one</a>.
        </p>
      </mat-list>
    </mat-card>
  `,
  styles: [`
    .header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .transaction-item { border-bottom: 1px solid #f0f0f0; }
    .amount { font-weight: 700; font-size: 1rem; margin-right: 8px; }
    .income { color: #388e3c; }
    .expense { color: #d32f2f; }
    .empty { text-align: center; padding: 32px; color: #888; }
  `]
})
export class TransactionListComponent implements OnInit {
  transactions$!: Observable<Transaction[]>;

  constructor(
    private financeService: FinanceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.transactions$ = this.financeService.getTransactions();
  }

  delete(t: Transaction): void {
    this.financeService.deleteTransaction(t.id);
    this.snackBar.open('Transaction deleted', 'Undo', { duration: 3000 });
  }
}
