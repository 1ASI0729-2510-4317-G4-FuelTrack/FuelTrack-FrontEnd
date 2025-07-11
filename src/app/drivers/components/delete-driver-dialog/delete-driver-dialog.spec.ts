import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDriverDialog } from './delete-driver-dialog';

describe('DeleteDriverDialog', () => {
  let component: DeleteDriverDialog;
  let fixture: ComponentFixture<DeleteDriverDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDriverDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDriverDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
