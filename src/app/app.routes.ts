import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './iam/pages/login/login.component';
import { RegisterComponent } from './iam/pages/register/register.component';
import { OrdersComponent } from './orders/pages/orders.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '**', redirectTo: 'orders' }
];
