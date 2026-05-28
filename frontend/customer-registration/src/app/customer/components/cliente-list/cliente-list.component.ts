import { Component, OnInit } from '@angular/core';
import { ClienteService, ClienteSummary } from '../../../core/services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
})
export class ClienteListComponent implements OnInit {
  clientes: ClienteSummary[] = [];
  loading = true;
  error = '';
  searchTerm = '';

  constructor(private readonly clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getAll().subscribe({
      next: (data) => { this.clientes = data; this.loading = false; },
      error: () => { this.error = 'Error al cargar los clientes.'; this.loading = false; },
    });
  }

  get filteredClientes(): ClienteSummary[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) return this.clientes;
    return this.clientes.filter(c =>
      c.customerNombre.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term)
    );
  }
}
