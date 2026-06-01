import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  activeCount = 0;
  lastAccess = 'Hoy, ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  constructor(
    private readonly router: Router,
    private readonly customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerService.getAll().subscribe({
      next: (list) => (this.activeCount = list.length),
      error: () => {},
    });
  }

  goToRegistration(): void {
    this.router.navigate(['/registration']);
  }

  goToCustomers(): void {
    this.router.navigate(['/customers']);
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  goToProductRegistration(): void {
    this.router.navigate(['/product-registration']);
  }

  goToEnvios(): void {
    this.router.navigate(['/envios']);
  }

  goToIncidencias(): void {
    this.router.navigate(['/incidencias']);
  }
}
