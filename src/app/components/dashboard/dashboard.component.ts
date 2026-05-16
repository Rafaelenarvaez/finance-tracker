import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { ChartConfiguration } from 'chart.js';
import { FinanceService } from '../../services/finance.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="summary-cards">
      <mat-card class="card balance">
        <mat-card-content>
          <p class="label">Total Balance</p>
          <h2 [class.negative]="(balance$ | async)! < 0">
            {{ balance$ | async | currency:'USD' }}
          </h2>
        </mat-card-content>
      </mat-card>

      <mat-card class="card income">
        <mat-card-content>
          <p class="label"><mat-icon>arrow_upward</mat-icon> Income</p>
          <h2>{{ income$ | async | currency:'USD' }}</h2>
        </mat-card-content>
      </mat-card>

      <mat-card class="card expense">
        <mat-card-content>
          <p class="label"><mat-icon>arrow_downward</mat-icon> Expenses</p>
          <h2>{{ expenses$ | async | currency:'USD' }}</h2>
        </mat-card-content>
      </mat-card>
    </div>

    <mat-card class="chart-card" *ngIf="(chartData$ | async) as chart">
      <mat-card-header>
        <mat-card-title>Monthly Overview</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <canvas baseChart
          [data]="chart"
          [options]="chartOptions"
          type="bar">
        </canvas>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .summary-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .card { text-align: center; }
    .label { color: #888; margin: 0 0 8px; display: flex; align-items: center; justify-content: center; gap: 4px; }
    h2 { font-size: 2rem; font-weight: 700; margin: 0; }
    .balance h2 { color: #1976d2; }
    .income h2 { color: #388e3c; }
    .expense h2 { color: #d32f2f; }
    .negative { color: #d32f2f !important; }
    .chart-card { padding-bottom: 16px; }
  `]
})
export class DashboardComponent implements OnInit {
  balance$!: Observable<number>;
  income$!: Observable<number>;
  expenses$!: Observable<number>;
  chartData$!: Observable<ChartConfiguration['data']>;

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true } }
  };

  constructor(private financeService: FinanceService) {}

  ngOnInit(): void {
    this.balance$ = this.financeService.getBalance();
    this.income$ = this.financeService.getTotalIncome();
    this.expenses$ = this.financeService.getTotalExpenses();

    this.chartData$ = this.financeService.getMonthlyData().pipe(
      map(data => ({
        labels: data.map(d => d.month),
        datasets: [
          { label: 'Income', data: data.map(d => d.income), backgroundColor: '#388e3c' },
          { label: 'Expenses', data: data.map(d => d.expense), backgroundColor: '#d32f2f' },
        ]
      }))
    );
  }
}
