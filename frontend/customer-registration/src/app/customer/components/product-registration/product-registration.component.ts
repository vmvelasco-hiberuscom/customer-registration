import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-registration',
  templateUrl: './product-registration.component.html',
  styleUrls: ['./product-registration.component.css'],
})
export class ProductRegistrationComponent {
  isSubmitting = false;
  apiError = '';

  readonly form = this.fb.group({
    nombre:      ['', [Validators.required, Validators.maxLength(200)]],
    descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
    precio:      [null as number | null, [Validators.required, Validators.min(0)]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly productService: ProductService,
    private readonly router: Router,
  ) {}

  control(name: string) {
    return this.form.get(name);
  }

  submit(): void {
    this.apiError = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const { nombre, descripcion, precio } = this.form.value;
    this.productService.create({ nombre: nombre!, descripcion: descripcion!, precio: precio! }).subscribe({
      next: () => this.router.navigate(['/products']),
      error: () => {
        this.apiError = 'Error al guardar el producto. Inténtalo de nuevo.';
        this.isSubmitting = false;
      },
    });
  }
}
