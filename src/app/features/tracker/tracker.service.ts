import { Injectable } from '@angular/core';
import { SupabaseService } from '../../core/services/supabase.service';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  constructor(private readonly supabaseService: SupabaseService) {
  }

  entries()  {
    return this.supabaseService.client.from('entries').select(`
    *,
    projects (
      id
    )
  ` )
  }

}
