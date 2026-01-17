import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ISession } from '../../../Models/interfaces/Session.Model';
import { IAPIRepsone } from '../../../Models/interfaces/common.Model';
import { ApiMethodConstant } from '../../../constants/global.constant';


@Injectable({
  providedIn: 'root',
})
export class RecordingService {
  
   http =  inject(HttpClient); 


  createNewSessionRecording(obj: ISession) : Observable<IAPIRepsone> {
    return this.http.post<IAPIRepsone>(environment.API_URL + ApiMethodConstant.POST_SESSIONS,obj)
  }

  getAllSessionRecording(): Observable<IAPIRepsone> {
    return this.http.get<IAPIRepsone>(environment.API_URL + ApiMethodConstant.SESSIONS);
  }

  deleteSessionRecording(sessionId: number): Observable<IAPIRepsone> {
    return this.http.delete<IAPIRepsone>(
      `${environment.API_URL}${ApiMethodConstant.POST_SESSIONS}/${sessionId}`
    );
  }

  updateSessionRecording(sessionId: number, obj: ISession): Observable<IAPIRepsone> {
    return this.http.put<IAPIRepsone>(
      `${environment.API_URL}${ApiMethodConstant.POST_SESSIONS}/${sessionId}`,
      obj
    );
  }
}