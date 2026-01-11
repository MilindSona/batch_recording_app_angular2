import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CandidateService } from '../../core/services/candidate/candidate-service';
import { CandidateModel } from '../../Models/class/candidate.Model';
import { IAPIRepsone } from '../../Models/interfaces/common.Model';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './candidates.html',
  styleUrl: './candidates.css',
})
export class Candidates implements OnInit {
  candidateForm!: FormGroup;
  candidateSer = inject(CandidateService);

  candidateList = signal<CandidateModel[]>([]);

  isEditMode = false;

  constructor() {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getCandidates();
  }

  getCandidates(): void {
    this.candidateSer.getAllCandidates().subscribe({
      next: (res: IAPIRepsone) => {
        if (res.result) {
          this.candidateList.set(res.data);
        }
      },
      error: err => console.error(err)
    });
  }

  initializeForm(): void {
    this.candidateForm = new FormGroup({
      candidateId: new FormControl(0),
      fullName: new FormControl(''),
      email: new FormControl(''),
      mobileNumber: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl(''),
      isActive: new FormControl(false),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date())
    });
  }

  onEdit(candidate: CandidateModel): void {
    this.candidateForm.patchValue(candidate);
    this.isEditMode = true;
  }

  onSaveCandidate(): void {
    const payload: CandidateModel = this.candidateForm.value;

    if (this.isEditMode) {
      this.candidateSer
        .updateCandidate(payload.candidateId, payload)
        .subscribe({
          next: (res) => {
            if (res.result) {
              alert('Candidate updated successfully');
              this.resetForm();
              this.getCandidates();
            }
          },
          error: err => console.error(err)
        });
    } else {
      this.candidateSer.createNewCandidate(payload).subscribe({
        next: (res) => {
          if (res.result) {
            alert('Candidate created successfully');
            this.resetForm();
            this.getCandidates();
          }
        },
        error: err => console.error(err)
      });
    }
  }


  onDelete(candidateId: number): void {
    this.candidateSer.deleteCandidate(candidateId).subscribe({
      next: (res) => {
        if (res.result) {
          alert('Candidate deleted successfully');
          this.getCandidates();
        }
      },
      error: err => console.error(err)
    });
  }

  resetForm(): void {
    this.candidateForm.reset({
      candidateId: 0,
      fullName: '',
      email: '',
      mobileNumber: '',
      password: '',
      role: '',
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    this.isEditMode = false;
  }
}
