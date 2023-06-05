import { Component, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerService } from './tracker.service';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export interface Entry {
  id: number;
  created_at: Date,
  start_entry: Date
  end_entry: Date,
  description: string,
  project: number,
}

@Component({
  selector: 'TT-tracker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full rounded-xl bg-gray-background h-20">
      
    </div>
  `,
  styles: []
})
export class TrackerComponent implements OnInit {
  entries: WritableSignal<Entry[]> = signal([]);



  constructor(private trackerService: TrackerService) {
  }

  ngOnInit(): void {
    this.trackerService.entries().then(({ data }: PostgrestSingleResponse<any[]>) => {
      console.log(data);
      this.entries.set(data as Entry[]);
    });
  }

}
