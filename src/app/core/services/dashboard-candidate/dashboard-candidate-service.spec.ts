import { TestBed } from '@angular/core/testing';

import { DashboardCandidateService } from './dashboard-candidate-service';

describe('DashboardCandidateService', () => {
  let service: DashboardCandidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardCandidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
