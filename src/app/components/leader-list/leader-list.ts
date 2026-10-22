import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GymLeaderService } from '../../services/gym-leader';

@Component({
  imports: [],
  selector: 'app-leader-list',
  styleUrl: './leader-list.css',
  templateUrl: './leader-list.html',
})
export class LeaderList implements OnInit {

  router = inject(Router);
  leaderService = inject(GymLeaderService);

  selectedRegion = signal('All')
  
  ngOnInit() {
    
  }


}
