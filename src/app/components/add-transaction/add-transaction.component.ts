import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FinanceService } from '../../services/finance.service';
import { Category } from '../../models/transaction.model';

@Component({
  selector: 'app-add-transaction',
  template: `
    <h2>New Transaction</h2>
    <mat-card class="form-card">
      <mat-card-content>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Description</mat-label>
            <input matInput formControlName="description" placeholder="e.g. Monthly Salary">
            <mat-error>Description is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Amount (USD)</mat-label>
            <input matInput type="number" formControlName="amount" placeholder="0.00">
            <mat-error>Enter a valid amount</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Type</mat-label>
            <mat-select formControlName="type">
              <mat-option value="income">💰 Income</mat-option>
              <mat-option value="expense">💸 Expense</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Category</mat-label>
            <mat-select formControlName="category">
              <mat-option *ngFor="let c of categories" [value]="c">{{ c }}</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Date</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="date">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>

          <div class="actions">
            <button mat-button type="button" routerLink="/transactions">Cancel</button>
            <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
              <mat-icon>save</mat-icon> Save Transaction
            </button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .form-card { max-width: 520px; margin: 0 auto; }
    .full-width { width: 100%; margin-bottom: 12px; }
    .actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 8px; }
  `]
})
export class AddTransactionComponent {
  categories: Category[] = [
    'Salary', 'Freelance', 'Food', 'Transport',
    'Housing', 'Entertainment', 'Health', 'Education', 'Other'
  ];

  form: FormGroup = this.fb.group({
    description: ['', Validators.required],
    amount: [null, [Validators.required, Validators.min(0.01)]],
    type: ['expense', Validators.required],
    category: ['Other', Validators.required],
    date: [new Date().toISOString().slice(0, 10), Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private financeService: FinanceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    if (this.form.invalid) return;
    const { description, amount, type, category, date } = this.form.value;
    this.financeService.addTransaction({
      description,
      amount: Number(amount),
      type,
      category,
      date: new Date(date).toISOString().slice(0, 10),
    });
    this.snackBar.open('Transaction saved!', '', { duration: 2000 });
    this.router.navigate(['/transactions']);
  }
}
