import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CustomerRegistrationRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface RegistrationResponse {
  status: 'success' | 'error';
  data?: {
    customerId: string;
    email: string;
    createdAt: string;
  };
  error?: {
    errorCode: string;
    message: string;
  };
}

@Injectable({ providedIn: 'root' })
export class CustomerRegistrationService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/customers/register';

  constructor(private readonly http: HttpClient) {}

  register(payload: CustomerRegistrationRequest): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(this.apiUrl, payload);
  }
}
