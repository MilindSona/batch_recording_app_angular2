import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BatchService } from '../../core/services/batch/batch-service';
import { DatePipe, NgClass } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BatchModel } from '../../Models/class/Batch.Model';
import { IAPIRepsone } from '../../Models/interfaces/common.Model';

@Component({
  selector: 'app-batch-master',
  imports: [FormsModule, NgClass, DatePipe, TableModule, ContextMenuModule],
  templateUrl: './batch-master.html',
  styleUrl: './batch-master.css',
})
export class BatchMaster implements OnInit, OnDestroy {

  newBatchObj: BatchModel = new BatchModel();
  batchSrv = inject(BatchService);
  batchList = signal<BatchModel[]>([]);
  isEditMode = false;
  subscription: Subscription = new Subscription();
  contextItems: MenuItem[] = [];
  selectedBatch: BatchModel | null = null;



  ngOnInit(): void {
    this.loadBatches();
    this.batchSrv.roleSub.subscribe((res) => {
      debugger;
    })
    this.batchSrv.roleBehvaiourSub.subscribe((res) => {
      debugger;
    })
    this.contextItems = [
      {
        label: 'Edit',
        icon: 'fas fa-edit',
        command: () => {
          if (this.selectedBatch) {
            this.onEdit(this.selectedBatch);
          }
        }
      },
      {
        label: 'Delete',
        icon: 'fas fa-trash',
        command: () => {
          if (this.selectedBatch) {
            this.onDelete(this.selectedBatch.batchId);
          }
        }
      }
    ];
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

  onContextMenuSelect(event: any) {
    this.selectedBatch = event?.data ?? null;
  }

}