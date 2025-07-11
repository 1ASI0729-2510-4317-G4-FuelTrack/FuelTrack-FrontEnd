import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementDrivers } from './management-drivers';

describe('ManagementDrivers', () => {
  let component: ManagementDrivers;
  let fixture: ComponentFixture<ManagementDrivers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementDrivers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementDrivers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
