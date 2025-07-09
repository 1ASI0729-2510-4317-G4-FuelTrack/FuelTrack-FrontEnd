import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PendingPayment {
  orderId: string;
  fuelType: string;
  quantity: number;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private apiUrl = 'https://fueltrack-back-end.onrender.com/orders/pending-payments';

  constructor(private http: HttpClient) {}

  getPendingPayments(): Observable<PendingPayment[]> {
    return this.http.get<PendingPayment[]>(this.apiUrl);
  }
}
