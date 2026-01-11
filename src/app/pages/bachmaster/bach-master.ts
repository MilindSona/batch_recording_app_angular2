import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BatchService } from '../../core/services/batch/batch-service';
import { DatePipe, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { BatchModel } from '../../Models/class/Batch.Model';
import { IAPIRepsone } from '../../Models/interfaces/common.Model';

@Component({
  selector: 'app-batch-master',
  imports: [FormsModule, NgClass, DatePipe],
  templateUrl: './batch-master.html',
  styleUrl: './batch-master.css',
})
export class BatchMaster implements OnInit, OnDestroy {

  newBatchObj: BatchModel = new BatchModel();
  batchSrv = inject(BatchService);
  batchList = signal<BatchModel[]>([]);
  isEditMode = false;
  subscription: Subscription = new Subscription();



  ngOnInit(): void {
    this.loadBatches();
    this.batchSrv.roleSub.subscribe((res) => {
      debugger;
    })
    this.batchSrv.roleBehvaiourSub.subscribe((res) => {
      debugger;
    })
  }

  loadBatches() {
    this.subscription = this.batchSrv.getAllBatches().subscribe({
      next: (result: IAPIRepsone) => {
        this.batchList.set(result.data);
      }
    })
  }

  onSaveBatch() {
  if (this.isEditMode) {
    this.batchSrv
      .updateBatch(this.newBatchObj.batchId, this.newBatchObj)
      .subscribe(res => {
        if (res.result) {
          alert('Batch updated successfully');
          this.onResetForm();
          this.loadBatches();
        }
      });
  } else {
    this.batchSrv.createNewBatch(this.newBatchObj).subscribe(res => {
      if (res.result) {
        alert('Batch created successfully');
        this.onResetForm();
        this.loadBatches();
      }
    });
  }
}


  onEdit(batch: BatchModel) {
    this.newBatchObj = { ...batch };
    this.isEditMode = true;
  }
  onDelete(batchId: number) {
    this.batchSrv.deleteBatch(batchId).subscribe({
      next: (res) => {
        if (res.result) {
          alert('Batch deleted successfully');
          this.loadBatches();
        }
      },
      error: (err) => console.error(err)
    });
  }
  onResetForm() {
    this.newBatchObj = new BatchModel();
    this.isEditMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}