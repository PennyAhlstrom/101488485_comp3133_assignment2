import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="d-flex justify-content-center py-4">
      <div class="spinner-border text-primary" role="status" aria-hidden="true"></div>
    </div>
  `,
})
export class LoadingSpinnerComponent {}