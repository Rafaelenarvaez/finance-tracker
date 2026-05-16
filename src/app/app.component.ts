import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .main-content {
      max-width: 960px;
      margin: 24px auto;
      padding: 0 16px;
    }
  `]
})
export class AppComponent {}
