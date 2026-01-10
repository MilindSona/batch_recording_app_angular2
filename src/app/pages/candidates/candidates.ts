import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CandidateService } from '../../core/services/candidate/candidate-service';
import { IAPIResponse } from '../../Models/interfaces/common.Model';
import { CandidateModel } from '../../Models/class/candidate.Model';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-candidates',
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './candidates.html',
  styleUrl: './candidates.css',
})
export class Candidates implements OnInit {
  candidateForm: FormGroup = new FormGroup({});
  CandidateList = signal<CandidateModel[]>([])
  candidateServ = inject(CandidateService)

  subscription:Subscription=new Subscription();

  constructor() {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getCandidates()
  }
  
  initializeForm() {
    this.candidateForm = new FormGroup({
      candidateId: new FormControl(0),
      fullName: new FormControl(''),
      email: new FormControl(''),
      mobileNumber: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl(''),
      isActive: new FormControl(false),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date()),
    })
  }

  getCandidates() {
   this.subscription= this.candidateServ.getAllCandidates().subscribe({
      next: (res: IAPIResponse) => {
        this.CandidateList.set(res.data)
      }
    })
  }

  onSaveCandidate() {
    debugger;
    const formValue = this.candidateForm.value;
    console.log(formValue)
    this.candidateServ.createNewCandidate(formValue).subscribe({
      next: (res: IAPIResponse) => {
        if (res.result) {
          alert("candidate created success");
          this.getCandidates();
          //this.initializeForm();
          this.candidateForm.reset();
        }
        else {
          alert(res.message)
        }
      },
      error: err => {
        console.error('Backend error:', err.error?.message);
      }
    })
  }

  onEdit(form:CandidateModel){
this.candidateForm.setValue(form)
  }
   ngOnDestroy(): void {
   this.subscription.unsubscribe();
 }
}
