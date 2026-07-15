import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class AuthPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  isLoginMode = true;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [''],
  });

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [''],
  });

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;

    this.loginForm.reset();
    this.registerForm.reset();
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const loginSuccess = true;

    if (loginSuccess) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Credenciais inválidas');
    }
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.toggleMode();
  }
}
