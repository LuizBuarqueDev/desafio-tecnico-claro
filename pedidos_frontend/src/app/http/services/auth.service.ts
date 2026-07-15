import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../api.config';

import { LoginRequest } from '@models/auth/login-request.model';
import { RegisterRequest } from '@models/auth/register-request.model';
import { AuthResponse } from '@models/auth/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly url = `${API_CONFIG.baseUrl}/auth`;

  private get storageAvailable(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  loginRequest(dto: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.url}/login`, dto);
  }

  registerRequest(dto: RegisterRequest) {
    return this.http.post(`${this.url}/register`, dto, {
      responseType: 'text',
    });
  }

  saveToken(token: string): void {
    if (!this.storageAvailable) return;

    localStorage.setItem('token', token);
  }

  logout(): void {
    if (!this.storageAvailable) return;

    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    if (!this.storageAvailable) return false;

    return !!this.getToken();
  }

  getToken(): string | null {
    if (!this.storageAvailable) return null;

    return localStorage.getItem('token');
  }
}
