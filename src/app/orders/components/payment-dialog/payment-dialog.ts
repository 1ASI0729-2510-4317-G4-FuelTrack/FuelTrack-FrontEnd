import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-payment-dialog',
  standalone: true,
  templateUrl: './payment-dialog.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
  ]
})
export class PaymentDialogComponent {
  form: FormGroup;
  suggestedAmount: number;

  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { quantity: number },
    private fb: FormBuilder
  ) {
    this.suggestedAmount = data.quantity * 10;

    this.form = this.fb.group({
      amount: [this.suggestedAmount, [Validators.required, Validators.min(this.suggestedAmount)]],
      method: ['transferencia', Validators.required]
    });
  }

  confirm(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
