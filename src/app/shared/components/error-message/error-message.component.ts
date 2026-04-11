import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [MatCardModule],
  template: `<mat-card class="error-card">{{ message }}</mat-card>`,
  styles: [`.error-card { color: var(--color-danger); padding: 16px; }`],
})
export class ErrorMessageComponent {
  @Input() message = 'Something went wrong.';
}