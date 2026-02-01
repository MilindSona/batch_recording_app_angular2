import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIRepsone } from '../../../Models/interfaces/common.Model';

@Injectable({
  providedIn: 'root',
})
export class DashboardCandidateService {
  http = inject(HttpClient);
  getCandidateDashboard(id: number): Observable<IAPIRepsone> {
    return this.http.get<IAPIRepsone>(`https://feestracking.freeprojectapi.com/api/BatchDashboard/candidate/${id}`);
  }

}
