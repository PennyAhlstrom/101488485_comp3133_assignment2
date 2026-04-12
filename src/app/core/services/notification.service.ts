import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  success(message: string): void {
    this.showToast(message, 'success', 3000);
  }

  error(message: string): void {
    this.showToast(message, 'danger', 4500);
  }

  private showToast(message: string, type: 'success' | 'danger', duration: number): void {
    if (typeof document === 'undefined') {
      console.log(`${type.toUpperCase()}: ${message}`);
      return;
    }

    const container = this.getContainer();
    const toast = document.createElement('div');

    toast.className = `toast align-items-center text-bg-${type} border-0 show mb-2 shadow`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${this.escapeHtml(message)}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button>
      </div>
    `;

    toast.querySelector('button')?.addEventListener('click', () => toast.remove());

    container.appendChild(toast);

    window.setTimeout(() => {
      toast.remove();
    }, duration);
  }

  private getContainer(): HTMLElement {
    let container = document.getElementById('app-toast-container');

    if (!container) {
      container = document.createElement('div');
      container.id = 'app-toast-container';
      container.className = 'toast-container position-fixed top-0 end-0 p-3';
      container.style.zIndex = '1080';
      document.body.appendChild(container);
    }

    return container;
  }

  private escapeHtml(value: string): string {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }
}