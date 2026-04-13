import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  template: `
    <div class="alert alert-danger mb-0" role="alert">
      {{ message }}
    </div>
  `,
})
export class ErrorMessageComponent {
  @Input() message = 'Something went wrong.';
}