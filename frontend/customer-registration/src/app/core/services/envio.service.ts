import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EnvioSummary {
  envioId: number;
  customerId: string;
  customerNombre: string;
  productId: number;
  productNombre: string;
  direccionEnvio: string;
  codigoPostal: string;
  pais: string;
  fechaEnvio: string;
  estado: string;
}

export interface EnvioCreateRequest {
  customerId: string;
  productId: number;
  direccionEnvio: string;
  codigoPostal: string;
  pais: string;
}

export interface EnvioUpdateRequest {
  direccionEnvio: string;
  codigoPostal: string;
  pais: string;
  estado: string;
}

@Injectable({ providedIn: 'root' })
export class EnvioService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/envios';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<EnvioSummary[]> {
    return this.http.get<EnvioSummary[]>(this.baseUrl);
  }

  create(request: EnvioCreateRequest): Observable<EnvioSummary> {
    return this.http.post<EnvioSummary>(this.baseUrl, request);
  }

  update(envioId: number, request: EnvioUpdateRequest): Observable<EnvioSummary> {
    return this.http.put<EnvioSummary>(`${this.baseUrl}/${envioId}`, request);
  }
}
