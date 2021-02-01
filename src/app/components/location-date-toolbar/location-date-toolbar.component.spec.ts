import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDateToolbarComponent } from './location-date-toolbar.component';

describe('LocationDateToolbarComponent', () => {
  let component: LocationDateToolbarComponent;
  let fixture: ComponentFixture<LocationDateToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationDateToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDateToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
