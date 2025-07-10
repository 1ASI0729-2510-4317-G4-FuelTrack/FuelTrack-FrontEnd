import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PendingPayment} from '../../orders/services/payments.service';
import {environment} from '../../../environments/environment';
import {Driver} from '../models/driver.model';
import {CreateDriverDto} from '../models/Create-driver-dto.model';


@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/drivers`;

  constructor(private http: HttpClient) {}

  getAllDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl);
  }

  createDriver(driverData: CreateDriverDto): Observable<Driver> {
    return this.http.post<Driver>(this.apiUrl, driverData);
  }

  deleteDriver(dni: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${dni}`);
  }
}
