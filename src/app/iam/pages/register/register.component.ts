import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  isClient = true;
  email = '';
  dni = '';
  ruc = '';
  password = '';

  toggleRole(role: 'client' | 'supplier') {
    this.isClient = role === 'client';
    this.email = '';
    this.dni = '';
    this.ruc = '';
    this.password = '';
  }

  register() {
    if (this.isClient) {
      console.log(`[Solicitante] Email: ${this.email}, DNI: ${this.dni}, Password: ${this.password}`);
    } else {
      console.log(`[Proveedor] Email: ${this.email}, DNI: ${this.dni}, RUC: ${this.ruc}, Password: ${this.password}`);
    }
  }
}
