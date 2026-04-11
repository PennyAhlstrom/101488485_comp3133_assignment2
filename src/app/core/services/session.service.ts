import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { STORAGE_KEYS } from '../constants/storage.constants';
import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly token = signal<string | null>(this.getStoredToken());
  readonly user = signal<User | null>(this.getStoredUser());

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private getStoredToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(STORAGE_KEYS.authToken);
  }

  private getStoredUser(): User | null {
    if (!this.isBrowser()) return null;

    const raw = localStorage.getItem(STORAGE_KEYS.authUser);
    return raw ? JSON.parse(raw) as User : null;
  }

  setSession(token: string, user: User): void {
    if (this.isBrowser()) {
      localStorage.setItem(STORAGE_KEYS.authToken, token);
      localStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(user));
    }

    this.token.set(token);
    this.user.set(user);
  }

  clearSession(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(STORAGE_KEYS.authToken);
      localStorage.removeItem(STORAGE_KEYS.authUser);
    }

    this.token.set(null);
    this.user.set(null);
  }

  isAuthenticated(): boolean {
    return !!this.token();
  }
}