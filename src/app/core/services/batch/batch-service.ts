import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiMethodsConstant } from '../../../constants/global.constant';
import { BatchModel } from '../../../Models/class/Batch.Model';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../Models/interfaces/common.Model';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  http=inject(HttpClient)

  createNewBatch(obj:BatchModel):Observable<IAPIResponse>{
    return this.http.post<IAPIResponse>(environment.API_URL + ApiMethodsConstant.BATCH, obj);
  }
  getAllBatches():Observable<IAPIResponse>{
    return this.http.get<IAPIResponse>(environment.API_URL+ ApiMethodsConstant.BATCH)
  }
}
