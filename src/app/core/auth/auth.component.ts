import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'TT-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="row flex-center flex">
      <div class="col-6 form-widget" aria-live="polite">
        <h1 class="header">Supabase + Angular</h1>
        <p class="description">Sign in via magic link with your email below</p>
        <form [formGroup]="signInForm" (ngSubmit)="onSubmit()" class="form-widget">
          <div>
            <label for="email">Email</label>
            <input
              id="email"
              formControlName="email"
              class="inputField"
              type="email"
              placeholder="Your email"
            />
          </div>
          <div>
            <label for="password">Password</label>
            <input
              id="password"
              formControlName="password"
              class="inputField"
              type="password"
              placeholder="Your password"
            />
          </div>
          <div>
            <button type="submit" class="button block" [disabled]="loading">
              {{ loading ? 'Loading' : 'Sign in' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class AuthComponent {
  loading = false

  signInForm = this.formBuilder.group({
    email: '',
    password: '',
  })

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder
  ) {}

  async onSubmit(): Promise<void> {
    try {
      this.loading = true
      const email = this.signInForm.value.email as string;
      const password = this.signInForm.value.password as string;
      await this.supabase.signIn(email, password)
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.signInForm.reset()
      this.loading = false
    }
  }
}
