import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BatchModel } from '../../Models/class/Batch.Model';
import { FormsModule } from '@angular/forms';
import { BatchService } from '../../core/services/batch/batch-service';
import { IAPIResponse } from '../../Models/interfaces/common.Model';
import { DatePipe, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bachmaster',
  imports: [FormsModule,NgClass,DatePipe],
  templateUrl: './bachmaster.html',
  styleUrl: './bachmaster.css',
})
export class Bachmaster implements OnInit,OnDestroy {
  currentUserData: any;
  router = inject(Router);
  newBatchObj: BatchModel = new BatchModel();
  BatchSrv = inject(BatchService)
  BatchList=signal< BatchModel[]>([])

  subscription:Subscription=new Subscription();

  constructor() {
    const localData = localStorage.getItem('batchuser')
    if (localData != null) {
      this.currentUserData = JSON.parse(localData);
    }
  }

  ngOnInit(): void {
this.loadBatches();
  }

  loadBatches() {
    this.subscription=this.BatchSrv.getAllBatches().subscribe({
      next: (res: IAPIResponse) => {
        this.BatchList.set(res.data)
      }
    })
  }
  onSaveBatch() {
    debugger;
    this.BatchSrv.createNewBatch(this.newBatchObj).subscribe({
      next: (res: IAPIResponse) => {
        if (res.result) {
          alert("Batch created successfully!");
          this.loadBatches();
        }
        else{
          alert(res.message)
        }
      },
      error: (error) => {
        alert(error.error.message)
      }
    })
  }

 ngOnDestroy(): void {
   this.subscription.unsubscribe();
 }
}
