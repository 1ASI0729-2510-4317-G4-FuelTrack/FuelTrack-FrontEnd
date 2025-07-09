import { Routes } from '@angular/router';
import { OrdersComponent } from './orders/pages/orders.component';
import { HomePageComponent } from './home/pages/homepage/homepage';
import { LoginComponent} from './iam/pages/login/login';
import { RegisterComponent } from './iam/pages/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'orders', component: OrdersComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'orders' },
];
