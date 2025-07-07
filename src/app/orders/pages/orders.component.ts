import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';

import {OrderService} from '../services/order.service';
import { OrderCardComponent } from '../components/order-card-component/order-card-component';
import {TranslatePipe} from '@ngx-translate/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    RouterLink,
    TranslatePipe,
    MatCardContent,
    MatCard,
    MatCardTitle,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = [

    'expand',
    'created',
    'user',
    'amount',
    'terminal',
    'id',
    'status',
  ];

  orders: any[] = [];
  expandedElement: any | null = null;

  constructor(
    private dialog: MatDialog,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        console.log('Órdenes recibidas:', data);
      },
      error: (err) => {
        console.error('Error al obtener órdenes:', err);
      }
    });
  }

  toggleRow(row: any) {
    this.expandedElement = this.expandedElement?.id === row.id ? null : row;
  }

  openOrderWizard(): void {
    this.dialog.open(OrderCardComponent, {
      width: '800px',
      panelClass: 'custom-dialog-container',
    });
  }
}
