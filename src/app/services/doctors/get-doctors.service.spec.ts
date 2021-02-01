import { TestBed } from '@angular/core/testing';

import { GetDoctorsService } from './get-doctors.service';

describe('GetDoctorsService', () => {
  let service: GetDoctorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDoctorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
