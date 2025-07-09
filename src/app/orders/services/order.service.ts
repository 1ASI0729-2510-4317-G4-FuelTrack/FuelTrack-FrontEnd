// src/app/orders/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, OrderPay } from '../models/order.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private api = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.api);
  }

  createOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.api, order);
  }

  registerPayment(orderId: string, payment: OrderPay): Observable<any> {
    return this.http.post(`${this.api}/${orderId}/payments`, payment);
  }
}
