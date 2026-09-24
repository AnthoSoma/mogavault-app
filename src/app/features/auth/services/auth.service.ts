import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest } from '../models/auth.model';

@Injectable()
export class AuthService {
  private readonly _http = inject(HttpClient);
  private readonly _apiUrl = '/api/v1/auth';

  public readonly isAuthenticated = signal<boolean>(false);

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this._http
      .post<AuthResponse>(`${this._apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          // Stockage du token (ou gestion via cookie HttpOnly côté Spring)
          localStorage.setItem('access_token', response.accessToken);
          this.isAuthenticated.set(true);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.isAuthenticated.set(false);
  }
}
