import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';

// Material Modules
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-order-wizard',
  standalone: true,
  templateUrl: './order-wizard.component.html',
  styleUrls: ['./order-wizard.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class OrderWizardComponent {
  step = 0;

  orderForm: FormGroup;
  fuelTypes = ['DIESEL', 'GLP', 'GASOLINE95', 'GASOLINE90'];
  terminals = ['Lurín', 'Pisco', 'Callao'];

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private dialogRef: MatDialogRef<OrderWizardComponent>
  ) {
    this.orderForm = this.fb.group({
      terminal: ['', Validators.required],
      fuel: ['', Validators.required],
      amount: [0, Validators.required],
      note: ['']
    });

  }

  next(): void {
    if (this.step < 1) this.step++;
  }

  back(): void {
    if (this.step > 0) this.step--;
  }

  close(): void {
    this.dialogRef.close();
  }

  createOrder(): void {
    const formValue = this.orderForm.value;

    const orderPayload = {
      requesterId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      fuelType: formValue.fuel.toUpperCase(),
      quantity: formValue.amount,
      note: formValue.note
    };

    this.orderService.createOrder(orderPayload).subscribe({
      next: () => {
        alert('Orden creada correctamente');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error creando la orden:', err);
        alert('Error creando la orden');
      }
    });
  }
}
