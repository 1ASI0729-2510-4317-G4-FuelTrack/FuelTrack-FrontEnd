// src/app/orders/pages/orders.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { OrderWizardComponent } from '../../components/order-wizard/order-wizard.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['createdAt', 'requesterId', 'fuelType', 'quantity', 'note', 'status'];
  orders: Order[] = [];

  constructor(private orderService: OrderService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAll().subscribe(data => this.orders = data);
  }

  openOrderWizard(): void {
    const dialogRef = this.dialog.open(OrderWizardComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadOrders();
    });
  }
}
