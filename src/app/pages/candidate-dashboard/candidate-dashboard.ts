import { Component, inject, signal } from '@angular/core';
import { DashboardCandidateService } from '../../core/services/dashboard-candidate/dashboard-candidate-service';

@Component({
  selector: 'app-candidate-dashboard',
  imports: [],
  templateUrl: './candidate-dashboard.html',
  styleUrl: './candidate-dashboard.css',
})
export class CandidateDashboard {
  candidateDashSrvc = inject(DashboardCandidateService);
dashList=signal<any>([]);

  constructor() {
    this.getCandidateDashboard(1);
  }
  getCandidateDashboard(id: number) {
    this.candidateDashSrvc.getCandidateDashboard(id).subscribe({
      next: (response) => {
        console.log('Candidate Dashboard Data:', response);
        this.dashList.set(response);
      }
    })
  }
}