import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GymLeaderService } from '../../services/gym-leader';

@Component({
  selector: 'app-leader-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './leader-form.html',
  styleUrl: './leader-form.css'
})
export class LeaderForm implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(GymLeaderService);
  private router = inject(Router);

  // Route Input Binding receives :id parameter automatically
  id = input<string>();

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    region: ['Kanto' as 'Kanto' | 'Johto' | 'Hoenn', Validators.required],
    town: ['', Validators.required],
    badge: ['', Validators.required],
    specialty: ['', Validators.required],
    aceLevel: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
    motto: ['', Validators.maxLength(150)]
  });

  ngOnInit() {
    const leaderId = this.id();
    if (leaderId) {
      this.service.getLeader(leaderId).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const leaderData = this.form.getRawValue();
    const leaderId = this.id();

    if (leaderId) {
      this.service.updateLeader(leaderId, leaderData).subscribe(() => this.navigateBack());
    } else {
      this.service.addLeader(leaderData).subscribe(() => this.navigateBack());
    }
  }

  onCancel() {
    this.navigateBack();
  }

  private navigateBack() {
    this.form.reset();
    this.router.navigate(['/leaders']);
  }
}