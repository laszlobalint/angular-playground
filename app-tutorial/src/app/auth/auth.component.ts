import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { AuthResponse } from './auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    let authObservable: Observable<AuthResponse>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObservable = this.authService.login(form.value.email, form.value.password);
    } else {
      authObservable = this.authService.signup(form.value.email, form.value.password);
    }

    authObservable.subscribe(
      (response) => this.router.navigate(['./recipes']),
      (errorMessage) => {
        this.error = errorMessage;
      },
    );

    this.isLoading = false;
    form.reset();
  }
}
