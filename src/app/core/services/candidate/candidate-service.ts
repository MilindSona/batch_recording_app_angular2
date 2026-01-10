import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CandidateModel } from '../../../Models/class/candidate.Model';
import { environment } from '../../../../environments/environment';
import { ApiMethodsConstant } from '../../../constants/global.constant';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../Models/interfaces/common.Model';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
   http=inject(HttpClient)

  createNewCandidate(obj:CandidateModel):Observable<IAPIResponse>{
    return this.http.post<IAPIResponse>(environment.API_URL + ApiMethodsConstant.CANDIDATES, obj);
  }
  getAllCandidates():Observable<IAPIResponse>{
    return this.http.get<IAPIResponse>(environment.API_URL+ ApiMethodsConstant.CANDIDATES)
  }
}

