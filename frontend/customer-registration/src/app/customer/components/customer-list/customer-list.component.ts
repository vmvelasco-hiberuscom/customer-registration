import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomerService, CustomerSummary } from '../../../core/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: CustomerSummary[] = [];
  loading = true;
  error = '';

  searchTerm = '';
  pageSize = 10;
  currentPage = 1;

  editingCustomer: CustomerSummary | null = null;
  editForm!: FormGroup;
  saving = false;
  saveError = '';

  deletingId: string | null = null;
  deleteError = '';

  constructor(
    private readonly customerService: CustomerService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s-]+$/)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s-]+$/)]],
    });
    this.loadCustomers();
  }

  private loadCustomers(): void {
    this.loading = true;
    this.error = '';
    this.customerService.getAll().subscribe({
      next: (data) => { this.customers = data; this.loading = false; },
      error: () => { this.error = 'Error al cargar los usuarios.'; this.loading = false; },
    });
  }

  get filteredCustomers(): CustomerSummary[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) return this.customers;
    return this.customers.filter(c =>
      c.email.toLowerCase().includes(term) ||
      c.firstName.toLowerCase().includes(term) ||
      c.lastName.toLowerCase().includes(term)
    );
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredCustomers.length / this.pageSize));
  }

  get pagedCustomers(): CustomerSummary[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCustomers.slice(start, start + this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onSearch(): void {
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  startEdit(customer: CustomerSummary): void {
    this.editingCustomer = customer;
    this.saveError = '';
    this.deletingId = null;
    this.editForm.setValue({ firstName: customer.firstName, lastName: customer.lastName });
  }

  cancelEdit(): void { this.editingCustomer = null; this.saveError = ''; }

  submitEdit(): void {
    if (this.editForm.invalid || !this.editingCustomer) return;
    this.saving = true;
    this.saveError = '';
    const { firstName, lastName } = this.editForm.value;
    this.customerService.update(this.editingCustomer.customerId, { firstName, lastName }).subscribe({
      next: (updated) => {
        const idx = this.customers.findIndex(c => c.customerId === updated.customerId);
        if (idx !== -1) this.customers[idx] = updated;
        this.editingCustomer = null;
        this.saving = false;
      },
      error: () => { this.saveError = 'Error al guardar los cambios.'; this.saving = false; },
    });
  }

  startDelete(id: string): void { this.deletingId = id; this.deleteError = ''; this.editingCustomer = null; }
  cancelDelete(): void { this.deletingId = null; this.deleteError = ''; }

  confirmDelete(id: string): void {
    this.customerService.delete(id).subscribe({
      next: () => { this.customers = this.customers.filter(c => c.customerId !== id); this.deletingId = null; },
      error: () => { this.deleteError = 'Error al eliminar el usuario.'; this.deletingId = null; },
    });
  }

  goHome(): void { this.router.navigate(['/']); }
  goToRegistration(): void { this.router.navigate(['/registration']); }
}

