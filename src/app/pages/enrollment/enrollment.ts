import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BatchService } from '../../core/services/batch/batch-service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { forkJoin, interval, map, Observable, of, Subscription } from 'rxjs';
import { CandidateService } from '../../core/services/candidate/candidate-service';
import { BatchModel } from '../../Models/class/Batch.Model';
import { CandidateModel } from '../../Models/class/candidate.Model';
import { IAPIRepsone } from '../../Models/interfaces/common.Model';
import { EnrollentService } from '../../core/services/enrollment/enrollment-service';
import { IBatchEnrollment } from '../../Models/interfaces/BatchEnrollment.Model';

@Component({
  selector: 'app-enrollment',
  imports: [ReactiveFormsModule, AsyncPipe, DatePipe],
  templateUrl: './enrollment.html',
  styleUrl: './enrollment.css',
})
export class Enrollment implements OnInit, OnDestroy {


  enrollmentForm: FormGroup = new FormGroup({});

  foromBuilder = inject(FormBuilder);
  batchService = inject(BatchService);
  candidateSrv = inject(CandidateService);
  enrollentService = inject(EnrollentService);
  batchData = signal<BatchModel[]>([]);
  enrollmentList = signal<IBatchEnrollment[]>([]);

  candidateList$: Observable<CandidateModel[]> = new Observable<CandidateModel[]>;

  subscriptipon: Subscription = new Subscription();

  currentDate = signal<any>(new Date());

  timerInterval$ = interval(1000);

  //currenTime: Observable<any> = new Observable<any>;

  couter$ = interval(2000);

  //counterValue = signal<number>(0);

  constructor() {
    this.initiaizeForm();

    // this.couter$.subscribe(res=>{
    //   this.counterValue.set(res);
    // })
    this.timerInterval$.subscribe(res => {
      this.currentDate.set(new Date())
    })
    this.candidateList$ = this.candidateSrv.getAllCandidates().pipe(
      map((res: IAPIRepsone) => res.data)
    );
  }

  ngOnInit(): void {
    this.getAllBatches();
    
  forkJoin([this.mhCityArray, this.mpCityArray]).subscribe((result: any) => {
    console.log(result[0])
    console.log(result[1])
  })
  }

  initiaizeForm() {
    this.enrollmentForm = this.foromBuilder.group({
      enrollmentId: 0,
      batchId: 0,
      candidateId: 0,
      enrollmentDate: "",
      isActive: false
    })
  }

  getAllBatches() {
    this.batchService.getAllBatches().subscribe({
      next: (res: IAPIRepsone) => {
        debugger;
        this.batchData.set(res.data);
      }
    })
  }

  getAllEnrollments() {
    this.enrollentService.getAllEnrollments().subscribe({
      next: (res: IAPIRepsone) => {
        this.enrollmentList.set(res.data);
      }
    })
  }

  onSaveEnrollment() {
    const formValue = this.enrollmentForm.value;
    debugger;
  }

  ngOnDestroy(): void {
    this.subscriptipon.unsubscribe();
  }
  mhCityArray = of(['Pune', 'Nagpur', 'Mumbai', 'Thane'])
  mpCityArray = of(['Bhopal', 'Indore'])

}