import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import {
  CustomerRegistrationRequest,
  CustomerRegistrationService,
} from '../../../core/services/customer-registration.service';
import { emailFormatValidator } from '../../validators/email-format.validator';
import { nameFormatValidator } from '../../validators/name-format.validator';
import { passwordStrengthValidator } from '../../validators/password-strength.validator';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent {
  @Output() registered = new EventEmitter<string>();
  @Output() failed = new EventEmitter<string>();

  isSubmitting = false;
  apiError = '';

  readonly form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.maxLength(255), emailFormatValidator()]],
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), nameFormatValidator()]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), nameFormatValidator()]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
        passwordStrengthValidator(),
      ],
    ],
    confirmPassword: ['', [Validators.required]],
    termsAccepted: [false, [Validators.requiredTrue]],
  }, { validators: this.passwordsMatchValidator() });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customerRegistrationService: CustomerRegistrationService
  ) {}

  submit(): void {
    this.apiError = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const payload = {
      email: this.form.value.email || '',
      firstName: this.form.value.firstName || '',
      lastName: this.form.value.lastName || '',
      password: this.form.value.password || '',
    } as CustomerRegistrationRequest;
    this.customerRegistrationService.register(payload).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        if (response.status === 'success') {
          const email = response.data?.email || payload.email;
          this.registered.emit(email);
          this.form.reset();
          return;
        }
        const message = response.error?.message || 'Unknown error.';
        this.apiError = message;
        this.failed.emit(message);
      },
      error: (error) => {
        this.isSubmitting = false;
        const message = error?.error?.error?.message || 'Request failed.';
        this.apiError = message;
        this.failed.emit(message);
      },
    });
  }

  control(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  hasError(name: string, error: string): boolean {
    const control = this.form.get(name);
    return !!control && control.hasError(error) && (control.dirty || control.touched);
  }

  private passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (!password || !confirmPassword) {
        return null;
      }

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }
}
