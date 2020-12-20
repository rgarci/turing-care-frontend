import { TestBed } from '@angular/core/testing';

import { GetRegistersService } from './get-registers.service';

describe('GetRegistersService', () => {
  let service: GetRegistersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRegistersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
