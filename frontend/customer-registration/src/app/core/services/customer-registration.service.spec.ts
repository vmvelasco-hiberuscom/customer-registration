import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CustomerRegistrationService } from './customer-registration.service';

describe('CustomerRegistrationService', () => {
  let service: CustomerRegistrationService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(CustomerRegistrationService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('posts registration payload to backend endpoint', () => {
    const payload = {
      email: 'user@example.com',
      firstName: 'User',
      lastName: 'Example',
      password: 'Strong1!',
    };

    service.register(payload).subscribe((response) => {
      expect(response.status).toBe('success');
      expect(response.data?.email).toBe(payload.email);
    });

    const request = httpController.expectOne('http://localhost:8080/api/v1/customers/register');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(payload);

    request.flush({
      status: 'success',
      data: {
        customerId: 'uuid',
        email: payload.email,
        createdAt: '2026-01-01T00:00:00Z',
      },
    });
  });
});
