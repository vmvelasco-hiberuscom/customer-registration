import { of, throwError } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationFormComponent } from './registration-form.component';
import { CustomerRegistrationService } from '../../../core/services/customer-registration.service';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let registrationService: jasmine.SpyObj<CustomerRegistrationService>;

  beforeEach(async () => {
    registrationService = jasmine.createSpyObj<CustomerRegistrationService>('CustomerRegistrationService', ['register']);

    await TestBed.configureTestingModule({
      declarations: [RegistrationFormComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: CustomerRegistrationService, useValue: registrationService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the form with expected controls', () => {
    expect(component.form.contains('email')).toBeTrue();
    expect(component.form.contains('firstName')).toBeTrue();
    expect(component.form.contains('lastName')).toBeTrue();
    expect(component.form.contains('password')).toBeTrue();
    expect(component.form.contains('confirmPassword')).toBeTrue();
    expect(component.form.contains('termsAccepted')).toBeTrue();
  });

  it('emits registered event when backend returns success', () => {
    registrationService.register.and.returnValue(
      of({
        status: 'success',
        data: { customerId: 'id', email: 'user@example.com', createdAt: '2026-01-01T00:00:00Z' },
      })
    );

    const registeredSpy = jasmine.createSpy('registeredSpy');
    component.registered.subscribe(registeredSpy);

    component.form.setValue({
      email: 'user@example.com',
      firstName: 'User',
      lastName: 'Example',
      password: 'Strong1!',
      confirmPassword: 'Strong1!',
      termsAccepted: true,
    });

    component.submit();

    expect(registrationService.register).toHaveBeenCalled();
    expect(registeredSpy).toHaveBeenCalledWith('user@example.com');
  });

  it('emits failed event when backend returns error', () => {
    registrationService.register.and.returnValue(
      throwError(() => ({ error: { error: { message: 'Request failed.' } } }))
    );

    const failedSpy = jasmine.createSpy('failedSpy');
    component.failed.subscribe(failedSpy);

    component.form.setValue({
      email: 'user@example.com',
      firstName: 'User',
      lastName: 'Example',
      password: 'Strong1!',
      confirmPassword: 'Strong1!',
      termsAccepted: true,
    });

    component.submit();

    expect(failedSpy).toHaveBeenCalledWith('Request failed.');
  });
});
