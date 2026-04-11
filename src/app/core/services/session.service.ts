import { Injectable, signal } from '@angular/core';
import { STORAGE_KEYS } from '../constants/storage.constants';
import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class SessionService {
  readonly token = signal<string | null>(localStorage.getItem(STORAGE_KEYS.authToken));
  readonly user = signal<User | null>(this.readUser());

  private readUser(): User | null {
    const raw = localStorage.getItem(STORAGE_KEYS.authUser);
    return raw ? JSON.parse(raw) : null;
  }

  setSession(token: string, user: User): void {
    localStorage.setItem(STORAGE_KEYS.authToken, token);
    localStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(user));
    this.token.set(token);
    this.user.set(user);
  }

  clearSession(): void {
    localStorage.removeItem(STORAGE_KEYS.authToken);
    localStorage.removeItem(STORAGE_KEYS.authUser);
    this.token.set(null);
    this.user.set(null);
  }

  isAuthenticated(): boolean {
    return !!this.token();
  }
}