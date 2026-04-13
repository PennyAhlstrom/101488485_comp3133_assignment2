import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="card border-0 shadow-sm">
      <div class="card-body text-center py-5">
        <h3 class="h5 mb-2">Nothing to show</h3>
        <p class="text-secondary mb-0">{{ message }}</p>
      </div>
    </div>
  `,
})
export class EmptyStateComponent {
  @Input() message = 'No data found.';
}