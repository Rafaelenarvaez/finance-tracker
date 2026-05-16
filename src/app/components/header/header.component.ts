import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <mat-icon>account_balance_wallet</mat-icon>
      <span style="margin-left: 8px; font-weight: 600;">Finance Tracker</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/dashboard" routerLinkActive="active-link">
        <mat-icon>dashboard</mat-icon> Dashboard
      </a>
      <a mat-button routerLink="/transactions" routerLinkActive="active-link">
        <mat-icon>list</mat-icon> Transactions
      </a>
      <a mat-raised-button color="accent" routerLink="/add">
        <mat-icon>add</mat-icon> Add
      </a>
    </mat-toolbar>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
    a { margin-left: 8px; }
    .active-link { background: rgba(255,255,255,0.15); border-radius: 4px; }
    mat-icon { margin-right: 4px; }
  `]
})
export class HeaderComponent {}
