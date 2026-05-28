import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ClienteSummary {
  clienteId: number;
  customerId: string;
  customerNombre: string;
  email: string;
  envioId: number;
  fechaAlta: string;
}

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/clientes';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<ClienteSummary[]> {
    return this.http.get<ClienteSummary[]>(this.baseUrl);
  }
}
