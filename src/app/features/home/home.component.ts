import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../core/services/supabase.service';
import { AccountComponent } from '../../core/account/account.component';
import { AuthComponent } from '../../core/auth/auth.component';
import { AuthSession } from '@supabase/supabase-js';
import { TrackerComponent } from '../tracker/tracker.component';

@Component({
  selector: 'TT-home',
  standalone: true,
  imports: [CommonModule, AccountComponent, AuthComponent, TrackerComponent],
  template: `
    <div class="p-10">
      <TT-account *ngIf="session(); else auth" [session]="session"></TT-account>
      <ng-template #auth>
        <TT-auth></TT-auth>
      </ng-template>
      <TT-tracker></TT-tracker>
    </div>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  session = signal<AuthSession | null>(this.supabase.session)

  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {
    this.supabase.authChanges((_, session) => this.session.set(session))
  }
}
