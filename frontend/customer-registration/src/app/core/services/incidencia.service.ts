import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IncidenciaSummary {
  incidenciaId: number;
  envioId: number;
  tipo: string;
  estado: string;
  descripcion: string;
  fechaIncidencia: string;
}

export interface IncidenciaCreateRequest {
  envioId: number;
  tipo: string;
  estado: string;
  descripcion: string;
}

export interface IncidenciaUpdateRequest {
  tipo: string;
  estado: string;
  descripcion: string;
}

@Injectable({ providedIn: 'root' })
export class IncidenciaService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/incidencias';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<IncidenciaSummary[]> {
    return this.http.get<IncidenciaSummary[]>(this.baseUrl);
  }

  create(request: IncidenciaCreateRequest): Observable<IncidenciaSummary> {
    return this.http.post<IncidenciaSummary>(this.baseUrl, request);
  }

  update(incidenciaId: number, request: IncidenciaUpdateRequest): Observable<IncidenciaSummary> {
    return this.http.put<IncidenciaSummary>(`${this.baseUrl}/${incidenciaId}`, request);
  }

  delete(incidenciaId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${incidenciaId}`);
  }
}
