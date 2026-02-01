import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIRepsone } from '../../../Models/interfaces/common.Model';
import { environment } from '../../../../environments/environment';
import { ApiMethodConstant } from '../../../constants/global.constant';

@Injectable({
  providedIn: 'root',
})
export class DashboardAdminService {
  private apiUrl = 'https://feestracking.freeprojectapi.com/api/BatchDashboard/GetBatchWiseRecordingCount';
  http=inject(HttpClient);

  getAdminDashboard(): Observable<IAPIRepsone> {
     return this.http.get<IAPIRepsone>(environment.API_URL + ApiMethodConstant.DASHBOARD_ADMIN);
   }

   getSessionsRecordingByBatchId(batchId: number): Observable<IAPIRepsone> {
    return this.http.get<IAPIRepsone>(
      `${environment.API_URL}${ApiMethodConstant.POST_SESSIONS}/by-batch/${batchId}`
    );
  }
  getBatchRecordingCount(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?userId=${userId}`);
  }
  
  
}
