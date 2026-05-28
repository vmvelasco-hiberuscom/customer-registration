import { Component, OnInit } from '@angular/core';
import { EnvioService, EnvioSummary } from '../../../core/services/envio.service';
import { CustomerService, CustomerSummary } from '../../../core/services/customer.service';
import { ProductService, ProductSummary } from '../../../core/services/product.service';

@Component({
  selector: 'app-envio-list',
  templateUrl: './envio-list.component.html',
  styleUrls: ['./envio-list.component.css'],
})
export class EnvioListComponent implements OnInit {
  envios: EnvioSummary[] = [];
  customers: CustomerSummary[] = [];
  products: ProductSummary[] = [];

  loading = true;
  error = '';

  searchTerm = '';
  showNewPanel = false;

  selectedCustomerId = '';
  selectedProductId: number | null = null;
  creating = false;
  createError = '';

  constructor(
    private readonly envioService: EnvioService,
    private readonly customerService: CustomerService,
    private readonly productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.loadAll();
    this.customerService.getAll().subscribe({ next: (data) => (this.customers = data), error: () => {} });
    this.productService.getAll().subscribe({ next: (data) => (this.products = data), error: () => {} });
  }

  private loadAll(): void {
    this.loading = true;
    this.error = '';
    this.envioService.getAll().subscribe({
      next: (data) => { this.envios = data; this.loading = false; },
      error: () => { this.error = 'Error al cargar los envíos.'; this.loading = false; },
    });
  }

  get filteredEnvios(): EnvioSummary[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) return this.envios;
    return this.envios.filter(e =>
      e.customerNombre.toLowerCase().includes(term) ||
      e.productNombre.toLowerCase().includes(term) ||
      e.estado.toLowerCase().includes(term)
    );
  }

  openNewPanel(): void {
    this.selectedCustomerId = '';
    this.selectedProductId = null;
    this.createError = '';
    this.showNewPanel = true;
  }

  cancelNew(): void {
    this.showNewPanel = false;
  }

  submitNew(): void {
    if (!this.selectedCustomerId || !this.selectedProductId) {
      this.createError = 'Selecciona un usuario y un producto.';
      return;
    }
    this.creating = true;
    this.createError = '';
    this.envioService.create({ customerId: this.selectedCustomerId, productId: this.selectedProductId }).subscribe({
      next: () => {
        this.creating = false;
        this.showNewPanel = false;
        this.loadAll();
      },
      error: () => {
        this.createError = 'Error al crear el envío. Inténtalo de nuevo.';
        this.creating = false;
      },
    });
  }

  estadoLabel(estado: string): string {
    const map: Record<string, string> = {
      pendiente: 'Pendiente',
      enviado: 'Enviado',
      entregado: 'Entregado',
      cancelado: 'Cancelado',
    };
    return map[estado] ?? estado;
  }
}
