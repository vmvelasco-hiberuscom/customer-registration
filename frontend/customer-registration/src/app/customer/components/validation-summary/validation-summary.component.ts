import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validation-summary',
  templateUrl: './validation-summary.component.html',
  styleUrls: ['./validation-summary.component.css'],
})
export class ValidationSummaryComponent {
  @Input() form: FormGroup | null = null;

  get hasValidationErrors(): boolean {
    return !!this.form && this.form.touched && this.form.invalid;
  }

  get validationMessages(): string[] {
    if (!this.form) {
      return [];
    }

    const entries = Object.entries(this.form.controls);
    return entries
      .filter(([, control]) => control.invalid && (control.dirty || control.touched))
      .map(([name, control]) => this.messageFor(name, control));
  }

  trackByMessage(_index: number, message: string): string {
    return message;
  }

  private messageFor(controlName: string, control: AbstractControl): string {
    const errors = control.errors;
    if (!errors) {
      return `${controlName} is invalid.`;
    }

    if (errors['required']) {
      return `${this.humanize(controlName)} is required.`;
    }
    if (errors['email'] || errors['emailFormat']) {
      return 'Email format is invalid.';
    }
    if (errors['minlength']) {
      return `${this.humanize(controlName)} is too short.`;
    }
    if (errors['maxlength']) {
      return `${this.humanize(controlName)} is too long.`;
    }
    if (errors['nameFormat']) {
      return `${this.humanize(controlName)} allows only letters, spaces, and hyphens.`;
    }
    if (errors['passwordStrength']) {
      return 'Password must include uppercase, lowercase, number, and special character.';
    }
    if (errors['requiredTrue']) {
      return 'You must accept the terms to continue.';
    }

    if (controlName === 'confirmPassword' && this.form?.hasError('passwordMismatch')) {
      return 'Confirm password must match the password.';
    }

    return `${this.humanize(controlName)} is invalid.`;
  }

  private humanize(value: string): string {
    const withSpaces = value.replace(/([A-Z])/g, ' $1');
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  }
}
