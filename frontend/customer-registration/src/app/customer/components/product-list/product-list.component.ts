import { Component, OnInit } from '@angular/core';
import { ProductService, ProductSummary } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: ProductSummary[] = [];
  loading = true;
  error = '';
  searchTerm = '';

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => { this.products = data; this.loading = false; },
      error: () => { this.error = 'Error al cargar los productos.'; this.loading = false; },
    });
  }

  get filteredProducts(): ProductSummary[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) return this.products;
    return this.products.filter(p =>
      p.nombre.toLowerCase().includes(term) ||
      p.descripcion.toLowerCase().includes(term)
    );
  }

  onSearch(): void {
    // Reactivo mediante el getter filteredProducts
  }
}
