import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthRequest, AuthResponse } from './auth.model';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer?: any;

  constructor(private readonly http: HttpClient, private readonly router: Router) {}

  signup(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-sn6y_EhLc-rC7UEiwmwXCAJMyw7yPkE', {
        email,
        password,
        returnSecureToken: true,
      } as AuthRequest)
      .pipe(
        catchError(this.handleError),
        tap((response) => this.handleAuthentication(response.localId, response.email, response.idToken, +response.expiresIn)),
      );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-sn6y_EhLc-rC7UEiwmwXCAJMyw7yPkE',
        {
          email,
          password,
          returnSecureToken: true,
        } as AuthRequest,
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => this.handleAuthentication(response.localId, response.email, response.idToken, +response.expiresIn)),
      );
  }

  autoLogin(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return;
    }
    const loadedUser = new User(user.id, user.email, user._token, new Date(user._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout(): void {
    localStorage.clear();
    this.user.next(null);
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  autoLogout(expiratonDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expiratonDuration);
  }

  private handleAuthentication(localId: string, email: string, idToken: string, expiresIn: number): void {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(localId, email, idToken, expirationDate);
    localStorage.setItem('user', JSON.stringify(user));
    this.autoLogout(expiresIn * 1000);
    this.user.next(user);
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    let message = 'An unknown error occured!';
    switch (errorResponse.error?.error?.message) {
      case 'EMAIL_EXISTS':
        message = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        message = 'Email address was not found!';
        break;
      case 'INVALID_PASSWORD':
        message = 'The password is invalid!';
        break;
      case 'USER_DISABLED':
        message = 'The user account has been disabled!';
        break;
      case 'INVALID_EMAIL':
        message = 'Email given is a not a valid address!';
        break;
      case 'EMAIL_EXISTS':
        message = 'The email address is already in use!';
        break;
      case 'OPERATION_NOT_ALLOWED':
        message = 'Password sign-in is disabled!';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        message = 'Requests have been blocker due to unusual activity!';
        break;
      default:
        message = 'An unknown error occured!';
        break;
    }
    return throwError(message);
  }
}
