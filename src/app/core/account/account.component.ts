import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile, SupabaseService } from '../services/supabase.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthSession } from '@supabase/supabase-js';

@Component({
  selector: 'TT-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="updateProfileForm" (ngSubmit)="updateProfile()" class="form-widget">
      <div>
        <label for="email">Email</label>
        <input id="email" type="text" [value]="session.user.email" disabled />
      </div>
      <div>
        <label for="username">Name</label>
        <input formControlName="username" id="username" type="text" />
      </div>
      <div>
        <label for="website">Website</label>
        <input formControlName="website" id="website" type="url" />
      </div>

      <div>
        <button type="submit" class="button primary block" [disabled]="loading">
          {{ loading ? 'Loading ...' : 'Update' }}
        </button>
      </div>

      <div>
        <button class="button block" (click)="signOut()">Sign Out</button>
      </div>
    </form>
  `,
  styles: [
  ]
})
export class AccountComponent implements OnInit {
  loading = false
  profile!: Profile

  @Input()
  session!: AuthSession

  updateProfileForm = this.formBuilder.group({
    username: '',
  })

  constructor(private readonly supabase: SupabaseService, private formBuilder: FormBuilder) {}

  async ngOnInit(): Promise<void> {
    await this.getProfile()

    const { username } = this.profile
    this.updateProfileForm.patchValue({
      username,
    })
  }

  async getProfile() {
    try {
      this.loading = true
      const { user } = this.session
      let { data: profile, error, status } = await this.supabase.profile(user)

      if (error && status !== 406) {
        throw error
      }

      if (profile) {
        this.profile = profile
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }

  async updateProfile(): Promise<void> {
    try {
      this.loading = true
      const { user } = this.session

      const username = this.updateProfileForm.value.username as string

      const { error } = await this.supabase.updateProfile({
        id: user.id,
        username,
      })
      if (error) throw error
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }

  async signOut() {
    await this.supabase.signOut()
  }
}
