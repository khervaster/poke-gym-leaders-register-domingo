import { Component, input, output, signal } from '@angular/core';
import { GymLeader } from '../../models/gym-leader';

@Component({
  imports: [],
  selector: 'app-leader-card',
  styleUrl: './leader-card.css',
  templateUrl: './leader-card.html',
})
export class LeaderCard {

  leader = input.required<GymLeader>();
  edit = output<string>();
  remove = output<string>();

}
