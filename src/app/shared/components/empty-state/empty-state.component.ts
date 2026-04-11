import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [MatCardModule],
  template: `<mat-card>{{ message }}</mat-card>`,
})
export class EmptyStateComponent {
  @Input() message = 'No data found.';
}