import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `<div class="spinner-wrap"><mat-spinner diameter="40" /></div>`,
  styles: [`.spinner-wrap { display:flex; justify-content:center; padding:24px; }`],
})
export class LoadingSpinnerComponent {}