import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CustomerSummary {
  customerId: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  registrationDate: string;
}

export interface CustomerUpdateRequest {
  firstName: string;
  lastName: string;
}

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/customers';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<CustomerSummary[]> {
    return this.http.get<CustomerSummary[]>(this.baseUrl);
  }

  update(id: string, request: CustomerUpdateRequest): Observable<CustomerSummary> {
    return this.http.patch<CustomerSummary>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
