import { TestBed } from '@angular/core/testing';

import { GetPatientsService } from './get-patients.service';

describe('GetPatientsService', () => {
  let service: GetPatientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPatientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
