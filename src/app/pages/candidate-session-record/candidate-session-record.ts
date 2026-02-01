import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { GlobalConstant } from '../../constants/global.constant';
import { EnrollentService } from '../../core/services/enrollment/enrollment-service';
import { RecordingService } from '../../core/services/recording/recording-service';
import { BatchService } from '../../core/services/batch/batch-service';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-candidate-session-record',
  imports: [DatePipe],
  templateUrl: './candidate-session-record.html',
  styleUrl: './candidate-session-record.css',
})
export class CandidateSessionRecord {
  loggedUserData: any;
  enrollServ= inject(EnrollentService); 
  enrollments:any=signal<any[]>([]);
  batchService = inject(BatchService);
  sessionRecording=signal<any[]>([]);
  selectedBatchId = signal<number | null>(null);
 @ViewChild('videoModal') videoModalRef!:ElementRef;
  sanitizer = inject(DomSanitizer);
  videoUrl!: SafeResourceUrl;

  constructor() {
    const localData = localStorage.getItem(GlobalConstant.LOCAL_KEY_LOGIN);
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
      this.getBatchesByCandidate();
    }
  }

  getBatchesByCandidate(){
    this.enrollServ.getEnrolledBatchesByCandidateId(this.loggedUserData.candidateId).subscribe({
      next:(res)=>{
        this.enrollments.set(res.data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
getVideoId(url: string): string {
  return url.split('youtu.be/')[1].split('?')[0];
}

  openVideoModal(url:string) {
  if(this.videoModalRef){
   this.videoModalRef.nativeElement.style.display = 'block';
   const videoId = this.getVideoId(url);
   this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`)
  }
}
closeVideoModal() {
  this.videoUrl = '';
   if(this.videoModalRef){
   this.videoModalRef.nativeElement.style.display = 'none';
  }
}
  getSessionsRecording(batchId: number) {
    this.selectedBatchId.set(batchId);
    this.batchService.getSessionsRecordingByBatchId(batchId).subscribe({
      next: (res) => {
        const data = Array.isArray(res?.data) ? res.data : [];
        this.sessionRecording.set(data);
      },
      error: (err) => {
        console.error('Failed to fetch sessions', err);
        this.sessionRecording.set([]);
      }
    });
  }
}
