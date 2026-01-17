import { Component, inject, signal } from '@angular/core';
import { form, minLength,Field, required } from '@angular/forms/signals';
import { map, Observable } from 'rxjs';
import { BatchService } from '../../core/services/batch/batch-service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RecordingService } from '../../core/services/recording/recording-service';
import { ISession } from '../../Models/interfaces/Session.Model';
import { BatchModel } from '../../Models/class/Batch.Model';
import { IAPIRepsone } from '../../Models/interfaces/common.Model';

@Component({
  selector: 'app-session-recordings',
  imports: [Field,AsyncPipe,DatePipe],
  templateUrl: './session-recordings.html',
  styleUrl: './session-recordings.css',
})
export class SessionRecordings {

  // Form model adjusted for select value typing
  newSession =  signal<{
    sessionId: number;
    batchId: string; // select values are strings
    topicName: string;
    topicDescription: string;
    youtubeVideoId: string;
    durationInMinutes: string;
    sessionDate: string;
    displayOrder: number;
    createdAt: Date;
    updatedAt: Date;
  }>({
    batchId: '',
    createdAt: new Date(),
    displayOrder: 0,
    durationInMinutes: '',
    sessionDate: '',
    sessionId: 0,
    topicDescription: '',
    topicName: '',
    updatedAt: new Date(),
    youtubeVideoId: ''
  });

  batchList$: Observable<BatchModel[]>= new Observable<BatchModel[]>();
  batchService = inject(BatchService);
  recordingSrv = inject(RecordingService);
  sessionList$: Observable<ISession[]> = new Observable<ISession[]>();
  isEditMode = false;

  sessionForm  = form(this.newSession,(scehma)=>{
    required(scehma.topicName,{message:'Topic Name is Required'}),
    required(scehma.topicDescription),
    required(scehma.batchId,{message:'Batch is Required'}),
    minLength(scehma.topicName, 4,{message:"Min 4 Chars Needed"})
  })
  
  constructor() {
    this.batchList$ = this.batchService.getAllBatches().pipe(
      map((res:IAPIRepsone)=> res.data)
    )
   
    this.sessionList$ = this.recordingSrv.getAllSessionRecording().pipe(
      map((res:IAPIRepsone)=> res.data)
    )
  }

  onSaveSession() {
    const formValue =  this.sessionForm().value();
    // Build a clean payload with proper types; omit server-managed fields
    const payload: ISession = {
      sessionId: Number(formValue.sessionId || 0),
      batchId: Number(formValue.batchId),
      topicName: (formValue.topicName || '').trim(),
      topicDescription: (formValue.topicDescription || '').trim(),
      youtubeVideoId: (formValue.youtubeVideoId || '').trim(),
      durationInMinutes: String(Number(formValue.durationInMinutes || 0)),
      sessionDate: formValue.sessionDate || '',
      displayOrder: Number(formValue.displayOrder || 0),
      // createdAt/updatedAt are server-managed; send empty to avoid 500s
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    if (this.isEditMode && payload.sessionId > 0) {
      this.recordingSrv.updateSessionRecording(payload.sessionId, payload).subscribe({
        next: (res: IAPIRepsone) => {
          if (res.result) {
            alert('Session updated successfully');
            this.sessionList$ = this.recordingSrv.getAllSessionRecording().pipe(
              map((r: IAPIRepsone) => r.data)
            );
            this.onResetForm();
          }
        },
        error: (err: any) => {
          console.error('Update session failed', err);
          const msg = err?.error?.message || err?.message || 'Error while updating session';
          alert(msg);
        }
      });
    } else {
      this.recordingSrv.createNewSessionRecording(payload).subscribe({
        next:(reS:any)=>{
        alert('Session Created Successfully');
        this.sessionList$ = this.recordingSrv.getAllSessionRecording().pipe(
          map((res:IAPIRepsone)=> res.data)
        )
        this.sessionForm().reset();
        },
        error:(err:any)=>{
          console.error('Create session failed', err);
          const msg = err?.error?.message || err?.message || 'Error while creating session';
          alert(msg);
        }
      })
    }
  }

  onDeleteSession(sessionId: number) {
    if (!confirm('Are you sure you want to delete this session?')) {
      return;
    }
    this.recordingSrv.deleteSessionRecording(sessionId).subscribe({
      next: (res: IAPIRepsone) => {
        if (res.result) {
          alert('Session deleted successfully');
          this.sessionList$ = this.recordingSrv.getAllSessionRecording().pipe(
            map((resp: IAPIRepsone) => resp.data)
          );
        }
      },
      error: (err: any) => {
        console.error('Delete session failed', err);
        const msg = err?.error?.message || err?.message || 'Error while deleting session';
        alert(msg);
      }
    });
  }

  onEditSession(session: ISession) {
    const normalized: ISession = {
      ...session,
      // ensure types align with form controls
      batchId: Number(session.batchId || 0),
      displayOrder: Number(session.displayOrder || 0),
      durationInMinutes: String(session.durationInMinutes ?? ''),
      sessionDate: this.formatDateForInput(session.sessionDate),
    };
    // Map to form model where batchId is string
    this.newSession.set({
      sessionId: normalized.sessionId,
      batchId: String(normalized.batchId ?? ''),
      topicName: normalized.topicName,
      topicDescription: normalized.topicDescription,
      youtubeVideoId: normalized.youtubeVideoId,
      durationInMinutes: normalized.durationInMinutes,
      sessionDate: normalized.sessionDate,
      displayOrder: normalized.displayOrder,
      createdAt: normalized.createdAt,
      updatedAt: normalized.updatedAt,
    });
    // explicitly reset the form with the session values to populate controls
    this.sessionForm().reset(this.newSession());
    this.isEditMode = true;
  }

  onResetForm() {
    this.newSession.set({
      batchId: '',
      createdAt: new Date(),
      displayOrder: 0,
      durationInMinutes: '',
      sessionDate: '',
      sessionId: 0,
      topicDescription: '',
      topicName: '',
      updatedAt: new Date(),
      youtubeVideoId: ''
    });
    this.isEditMode = false;
    this.sessionForm().reset();
  }

  private formatDateForInput(dateStr: string): string {
    if (!dateStr) return '';
    // If already in yyyy-MM-dd format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

}

 