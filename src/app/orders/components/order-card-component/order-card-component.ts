import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-card-component',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './order-card-component.html',
  styleUrl: './order-card-component.css'
})
export class OrderCardComponent {
  step = 0;
  orderForm!: FormGroup;
  terminals = ['Callao', 'Lurín', 'Pisco'];
  fuelTypes = ['GLP', 'GNV', 'Diesel B5'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OrderCardComponent>
  ) {
    this.orderForm = this.fb.group({
      requesterId: ['', Validators.required],
      terminal: [''], // Puedes poner Validators.required si deseas
      details: this.fb.array([this.createDetailGroup()])
    });
  }

  get details(): FormArray {
    return this.orderForm.get('details') as FormArray;
  }

  createDetailGroup(): FormGroup {
    return this.fb.group({
      fuel: ['', Validators.required],
      amount: ['', Validators.required],
      note: ['']
    });
  }

  addDetail() {
    this.details.push(this.createDetailGroup());
  }

  next() {
    if (this.step < 1) this.step++;
  }

  back() {
    if (this.step > 0) this.step--;
  }

  close() {
    this.dialogRef.close();
  }

  createOrder() {
    if (this.orderForm.valid) {
      console.log(this.orderForm.value);
      this.dialogRef.close(this.orderForm.value);
    } else {
      this.orderForm.markAllAsTouched();
    }
  }
}
