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

  id = input<string>();

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    region: ['Kanto' as 'Kanto' | 'Johto' | 'Hoenn', Validators.required],
    town: ['', Validators.required],
    badge: ['', Validators.required],
    specialty: ['Fire', Validators.required],
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

  changeLevel(amount: number) {
    const current = this.form.controls.aceLevel.value || 1;
    const updated = Math.min(100, Math.max(1, current + amount));
    this.form.controls.aceLevel.setValue(updated);
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