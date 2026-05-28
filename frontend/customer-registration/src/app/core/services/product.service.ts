import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductSummary {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

export interface ProductCreateRequest {
  nombre: string;
  descripcion: string;
  precio: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/products';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<ProductSummary[]> {
    return this.http.get<ProductSummary[]>(this.baseUrl);
  }

  create(request: ProductCreateRequest): Observable<ProductSummary> {
    return this.http.post<ProductSummary>(this.baseUrl, request);
  }
}
