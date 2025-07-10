import {Component, inject} from '@angular/core';
import {AbstractControl, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {DriverService} from '../../services/driver.service';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {CreateDriverDto} from '../../models/Create-driver-dto.model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-create-driver-dialog',
  imports: [
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatButton,
    MatFormField,
    MatFormField,
    MatInput,
    MatFormField,
    MatDialogActions,
    MatDialogTitle,
    MatLabel,
    MatError
  ],
  templateUrl: './create-driver-dialog.html',
  styleUrl: './create-driver-dialog.css'
})
export class CreateDriverDialog {

  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CreateDriverDialog>);

  driverForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    email: ['', [Validators.required, Validators.email]],
    plate: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    model: ['', [Validators.required]],
    year: [new Date().getFullYear(), [Validators.required, Validators.min(2000)]],
    tankCapacity: [0, [Validators.required, Validators.min(500)]]
  });

  // Type-safe getters for form controls
  get firstName(): AbstractControl | null { return this.driverForm.get('firstName'); }
  get lastName(): AbstractControl | null { return this.driverForm.get('lastName'); }
  get dni(): AbstractControl | null { return this.driverForm.get('dni'); }
  get email(): AbstractControl | null { return this.driverForm.get('email'); }
  get plate(): AbstractControl | null { return this.driverForm.get('plate'); }
  get brand(): AbstractControl | null { return this.driverForm.get('brand'); }
  get model(): AbstractControl | null { return this.driverForm.get('model'); }
  get year(): AbstractControl | null { return this.driverForm.get('year'); }
  get tankCapacity(): AbstractControl | null { return this.driverForm.get('tankCapacity'); }

  // Helper methods for error checking
  hasError(control: AbstractControl | null, errorCode: string): boolean {
    return control ? control.hasError(errorCode) : false;
  }

  onSubmit(): void {
    if (this.driverForm.valid) {
      this.dialogRef.close(this.driverForm.value as CreateDriverDto);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
