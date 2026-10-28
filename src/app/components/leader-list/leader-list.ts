import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GymLeaderService } from '../../services/gym-leader';
import { LeaderCard } from '../leader-card/leader-card';

@Component({
  selector: 'app-leader-list',
  standalone: true,
  imports: [LeaderCard],
  templateUrl: './leader-list.html',
  styleUrl: './leader-list.css'
})
export class LeaderList implements OnInit {
  private service = inject(GymLeaderService);
  private router = inject(Router);

  selectedRegion = signal<'All' | 'Kanto' | 'Johto' | 'Hoenn'>('All');

  filteredLeaders = computed(() => {
    const region = this.selectedRegion();
    const all = this.service.leaders();
    return region === 'All' ? all : all.filter(l => l.region === region);
  });

  ngOnInit() {
    this.service.fetchLeaders().subscribe();
  }

  onEdit(id: string) {
    this.router.navigate(['/leaders', id, 'edit']);
  }

  onDelete(id: string) {
    const leader = this.service.leaders().find(l => l._id === id);
    if (confirm(`Remove ${leader?.name || 'this leader'} from the registry?`)) {
      this.service.deleteLeader(id).subscribe(() => {
        this.service.fetchLeaders().subscribe();
      });
    }
  }
}