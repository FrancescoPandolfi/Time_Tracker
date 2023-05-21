import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../core/services/supabase.service';
import { AccountComponent } from '../../core/account/account.component';
import { AuthComponent } from '../../core/auth/auth.component';

@Component({
  selector: 'TT-home',
  standalone: true,
  imports: [CommonModule, AccountComponent, AuthComponent],
  template: `
    <div class="container" style="padding: 50px 0 100px 0">
      <TT-account *ngIf="session; else auth" [session]="session"></TT-account>
      <ng-template #auth>
        <TT-auth></TT-auth>
      </ng-template>
    </div>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  session = this.supabase.session

  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session))
  }
}
