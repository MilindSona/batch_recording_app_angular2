import { Component, inject } from '@angular/core';
import { DashboardAdminService } from '../../core/services/dashboard-admin/dashboard-admin-service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  dashBoardService = inject(DashboardAdminService);
  http = inject(HttpClient);

  ngOnInit(): void {
    this.loadAdminDashboard();
    this.loadGetBatchWiseRecordingCount(178); // Example userId
  }
  loadAdminDashboard(): void {
    this.dashBoardService.getAdminDashboard().subscribe((response) => {
      console.log('Admin Dashboard Data:', response);
    });
    
  }

  loadGetBatchWiseRecordingCount(userId: number):void{
    this.dashBoardService.getBatchRecordingCount(userId).subscribe((response)=>{
      console.log('Batch Wise Recording Count:',response);
    }); 
  }

}
