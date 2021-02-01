import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDataCardComponent } from './patient-data-card.component';

describe('PatientDataCardComponent', () => {
  let component: PatientDataCardComponent;
  let fixture: ComponentFixture<PatientDataCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDataCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
