import { Routes } from '@angular/router';
import { OrdersComponent } from './orders/pages/order/orders.component';
import { HomePageComponent } from './home/pages/homepage/homepage';
import { LoginComponent} from './iam/pages/login/login';
import { RegisterComponent } from './iam/pages/register/register';
import { PaymentsComponent} from './orders/pages/payments/payments';
import { OrdersLayoutComponent } from './orders/pages/orders-layout/orders-layout';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: OrdersLayoutComponent, // el layout común con sidebar
    children: [
      {
        path: 'orders',
        loadComponent: () => import('../app/orders/pages/order/orders.component').then(m => m.OrdersComponent)
      },
      {
        path: 'payments',
        loadComponent: () => import('../app/orders/pages/payments/payments').then(m => m.PaymentsComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'orders' }
];
