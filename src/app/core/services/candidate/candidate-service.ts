import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IAPIRepsone } from '../../../Models/interfaces/common.Model';
import { CandidateModel } from '../../../Models/class/candidate.Model';
import { ApiMethodConstant } from '../../../constants/global.constant';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  
  http =  inject(HttpClient); 


  createNewCandidate(obj: CandidateModel) : Observable<IAPIRepsone> {
    return this.http.post<IAPIRepsone>(environment.API_URL + ApiMethodConstant.CANDIDATES,obj)
  }

  getAllCandidates(): Observable<IAPIRepsone> {
    return this.http.get<IAPIRepsone>(environment.API_URL + ApiMethodConstant.CANDIDATES);
  }
 deleteCandidate(candidateId: number): Observable<IAPIRepsone> {
    return this.http.delete<IAPIRepsone>(
      `${environment.API_URL}${ApiMethodConstant.CANDIDATES}/${candidateId}`
    );
  }
  updateCandidate(candidateId: number, obj: CandidateModel): Observable<IAPIRepsone> {
    return this.http.put<IAPIRepsone>(
      `${environment.API_URL}${ApiMethodConstant.CANDIDATES}/${candidateId}`,
      obj
    );
  }
}

