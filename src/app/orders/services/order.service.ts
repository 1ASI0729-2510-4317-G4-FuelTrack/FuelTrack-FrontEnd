import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}/orders`; // 👈 importante

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post(this.baseUrl, orderData);
  }

  processOrder(orderId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${orderId}`, {});
  }
}
