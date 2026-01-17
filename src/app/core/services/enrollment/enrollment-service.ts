import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBatchEnrollment } from '../../../Models/interfaces/BatchEnrollment.Model';
import { IAPIRepsone } from '../../../Models/interfaces/common.Model';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../environments/environment.development';
import { ApiMethodConstant } from '../../../constants/global.constant';

@Injectable({
  providedIn: 'root',
})
export class EnrollentService {
  http = inject(HttpClient);

  createNewEnrollment(obj: IBatchEnrollment): Observable<IAPIRepsone> {
    return this.http.post<IAPIRepsone>(environment.API_URL + ApiMethodConstant.ENROLLMENTS, obj)
  }

  getAllEnrollments(): Observable<IAPIRepsone> {
    return this.http.get<IAPIRepsone>(environment.API_URL + ApiMethodConstant.ENROLLMENTS);
  }
  updateEnrollment(enrollmentId: number, obj: IBatchEnrollment): Observable<IAPIRepsone> {
    return this.http.put<IAPIRepsone>(
      `${environment.API_URL}${ApiMethodConstant.ENROLLMENTS}/${enrollmentId}`,
      obj
    );
  }

  deleteEnrollment(enrollmentId: number): Observable<IAPIRepsone> {
    return this.http.delete<IAPIRepsone>(
      `${environment.API_URL}${ApiMethodConstant.ENROLLMENTS}/${enrollmentId}`
    );
  } 
}