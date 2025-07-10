import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDriverDialog } from './create-driver-dialog';

describe('CreateDriverDialog', () => {
  let component: CreateDriverDialog;
  let fixture: ComponentFixture<CreateDriverDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDriverDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDriverDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
