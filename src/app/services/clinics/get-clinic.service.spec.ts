import { TestBed } from '@angular/core/testing';

import { GetClinicService } from './get-clinic.service';

describe('GetClinicService', () => {
  let service: GetClinicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetClinicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
