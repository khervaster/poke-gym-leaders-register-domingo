import { Component, inject, OnInit } from '@angular/core';
import { GymLeaderService } from '../../services/gym-leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  service = inject(GymLeaderService);

  ngOnInit() {
    this.service.fetchLeaders().subscribe();
  }
}