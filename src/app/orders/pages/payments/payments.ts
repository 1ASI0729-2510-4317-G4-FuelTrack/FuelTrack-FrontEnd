import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PaymentDialogComponent } from '../../components/payment-dialog/payment-dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface Payment {
  paymentId: string;
  fuelOrder: {
    orderId: string;
    fuelType: string;
    quantity: number;
  };
  status: string;
}

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './payments.html',
  styleUrls: ['./payments.css']
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  backendUrl = 'https://fueltrack-back-end.onrender.com/orders';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.http.get<Payment[]>(`${this.backendUrl}/pending-payments`)
      .subscribe({
        next: (data) => {
          this.payments = data;
          console.log('📦 Pagos pendientes:', this.payments);
        },
        error: (err) => {
          console.error('❌ Error al obtener pagos pendientes:', err);
        }
      });
  }

  completePayment(payment: Payment) {
    const orderId = payment.fuelOrder.orderId;

    this.dialog.open(PaymentDialogComponent, {
      width: '400px',
      data: { quantity: payment.fuelOrder.quantity }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.sendPayment(orderId, result.amount, result.method);
      }
    });
  }

  private sendPayment(orderId: string, amount: number, method: string) {
    const body = { amount, method };

    this.http.put(`${this.backendUrl}/${orderId}/payment`, body)
      .subscribe({
        next: () => {
          this.snackBar.open(`✅ Pago completado para el pedido ${orderId}`, 'Cerrar', {
            duration: 3000,
            panelClass: 'snackbar-success'
          });

          this.processOrder(orderId);
        },
        error: err => {
          const errorMsg = err.error || 'Error desconocido al completar el pago';
          this.snackBar.open(`❌ ${errorMsg}`, 'Cerrar', {
            duration: 4000,
            panelClass: 'snackbar-error'
          });
        }
      });
  }

  private processOrder(orderId: string) {
    this.http.put(`${this.backendUrl}/${orderId}/process`, {})
      .subscribe({
        next: () => {
          this.snackBar.open(`🛠 Pedido ${orderId} procesado correctamente`, 'Cerrar', {
            duration: 3000,
            panelClass: 'snackbar-success'
          });

          this.payments = this.payments.filter(p => p.fuelOrder.orderId !== orderId);
        },
        error: err => {
          this.snackBar.open(`❌ Error al procesar el pedido`, 'Cerrar', {
            duration: 4000,
            panelClass: 'snackbar-error'
          });
        }
      });
  }
}
