import { Component, inject, signal } from '@angular/core';
import { form, minLength,Field, required } from '@angular/forms/signals';
import { map, Observable } from 'rxjs';
import { BatchService } from '../../core/services/batch/batch-service';
import { AsyncPipe } from '@angular/common';
import { RecordingService } from '../../core/services/recording/recording-service';
import { ISession } from '../../Models/interfaces/Session.Model';
import { BatchModel } from '../../Models/class/Batch.Model';
import { IAPIRepsone } from '../../Models/interfaces/common.Model';

@Component({
  selector: 'app-session-recordings',
  imports: [Field,AsyncPipe],
  templateUrl: './session-recordings.html',
  styleUrl: './session-recordings.css',
})
export class SessionRecordings {

  newSession =  signal<ISession>({
    batchId: 0,
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

  sessionForm  = form(this.newSession,(scehma)=>{
    required(scehma.topicName,{message:'Topic Name is Required'}),
    required(scehma.topicDescription),
    minLength(scehma.topicName, 4,{message:"Min 4 Chars Needed"})
  })
  
  constructor() {
    this.batchList$ = this.batchService.getAllBatches().pipe(
      map((res:IAPIRepsone)=> res.data)
    )
  }

  onSaveSession() {
    const formValue =  this.sessionForm().value();
    debugger;
    this.recordingSrv.createNewSessionRecording(formValue).subscribe({
      next:(reS:any)=>{

      }
    })
  }

}

 