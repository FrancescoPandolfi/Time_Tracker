import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SupabaseService } from './core/services/supabase.service';

@Component({
  selector: 'TT-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  constructor(private readonly supabase: SupabaseService, private router: Router) {}

  ngOnInit() {
    this.supabase.authChanges((_, session) => {
        console.log(session);
        this.router.navigate(!session ? ['/auth'] : ['/']);
      }
    );
  }
}
