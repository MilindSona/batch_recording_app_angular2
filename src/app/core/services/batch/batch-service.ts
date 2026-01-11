import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IAPIRepsone } from '../../../Models/interfaces/common.Model';
import { BatchModel } from '../../../Models/class/Batch.Model';
import { ApiMethodConstant } from '../../../constants/global.constant';

@Injectable({
  providedIn: 'root',
})
export class BatchService {


  http = inject(HttpClient);

  roleSub = new Subject<string>();

  roleBehvaiourSub = new BehaviorSubject<string>("");

  createNewBatch(obj: BatchModel): Observable<IAPIRepsone> {
    debugger;
    return this.http.post<IAPIRepsone>(environment.API_URL + ApiMethodConstant.BATCH, obj)
  }

  getAllBatches(): Observable<IAPIRepsone> {
    return this.http.get<IAPIRepsone>(environment.API_URL + ApiMethodConstant.BATCH);
  }
  deleteBatch(batchId: number): Observable<IAPIRepsone> {
    return this.http.delete<IAPIRepsone>(
      `${environment.API_URL}${ApiMethodConstant.BATCH}/${batchId}`
    );
  }
  updateBatch(batchId: number, obj: BatchModel): Observable<IAPIRepsone> {
    return this.http.put<IAPIRepsone>(
      `${environment.API_URL}${ApiMethodConstant.BATCH}/${batchId}`,
      obj
    );
  }
}
