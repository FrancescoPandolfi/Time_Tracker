import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile, SupabaseService } from '../services/supabase.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthSession } from '@supabase/supabase-js';
import { from } from 'rxjs';

@Component({
  selector: 'TT-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="updateProfileForm" (ngSubmit)="updateProfile()" class="form-widget">
      <div>
        <label for="email">Email</label>
        <input id="email" type="text" [value]="session()?.user?.email" disabled/>
      </div>
      <div>
        <label for="username">Name</label>
        <input formControlName="username" id="username" type="text"/>
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
  styles: []
})
export class AccountComponent implements OnInit {
  loading = false
  profile!: Profile

  @Input({ required: true }) session: WritableSignal<AuthSession | null> = signal(null)

  updateProfileForm = this.formBuilder.group({
    username: ''
  })

  constructor(private readonly supabase: SupabaseService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getProfile()
  }

  getProfile() {
    this.loading = true
    const session = this.session();
    if (session) {
      from(this.supabase.profile(session.user))
        .subscribe((res) => {
            this.profile = res.data as Profile
            this.loading = false
            const { username } = this.profile
            this.updateProfileForm.patchValue({
              username
            })
          }
        )
    }


  }

  async updateProfile(): Promise<void> {
    try {
      this.loading = true
      const session = this.session();
      if (session) {
        const username = this.updateProfileForm.value.username as string
        const { error } = await this.supabase.updateProfile({
          id: session.user.id,
          username
        })
        if (error) throw error
      }

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
