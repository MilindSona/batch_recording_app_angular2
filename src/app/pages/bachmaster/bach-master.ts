import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BatchService } from '../../core/services/batch/batch-service';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BatchModel } from '../../Models/class/Batch.Model';
import { IAPIRepsone } from '../../Models/interfaces/common.Model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-batch-master',
  imports: [FormsModule,NgIf, NgClass, DatePipe, TableModule, ContextMenuModule, ToastModule, ConfirmDialogModule],
  providers: [MessageService,ConfirmationService],
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
  msg = inject(MessageService);
  confirm = inject(ConfirmationService);



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
          this.msg.add({severity:'success', summary:'Success', detail:'Batch updated successfully'});
          this.onResetForm();
          this.loadBatches();
        }
      });
  } else {
    this.batchSrv.createNewBatch(this.newBatchObj).subscribe(res => {
      if (res.result) {
        this.msg.add({severity:'success', summary:'Success', detail:'Batch created successfully'});
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
    this.confirm.confirm({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this batch?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      accept: () => {
        this.batchSrv.deleteBatch(batchId).subscribe({
          next: (res) => {
            if (res.result) {
              this.msg.add({severity:'success', summary:'Success', detail:'Batch deleted successfully'});
              this.loadBatches();
            }
          },
          error: (err) => {
            console.error(err);
            this.msg.add({severity:'error', summary:'Error', detail:'Failed to delete batch'});
          }
        });
      },
      reject: () => {
        this.msg.add({severity:'info', summary:'Cancelled', detail:'Delete action cancelled'});
      }
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