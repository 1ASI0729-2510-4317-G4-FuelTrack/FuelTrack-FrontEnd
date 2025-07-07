import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isClient = true;
  email = '';
  ruc = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    if (this.isClient) {
      console.log(`[Client] Email:`, this.email);
      this.router.navigate(['/orders']);
    } else {
      console.log(`[Supplier] RUC:`, this.ruc);
      this.router.navigate(['/orders-management']);
    }
    console.log('Password:', this.password);
  }

  toggleLogin() {
    this.isClient = !this.isClient;
    this.email = '';
    this.ruc = '';
    this.password = '';
  }
}

