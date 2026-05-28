import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s-]+$/;

export const nameFormatValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) {
      return null;
    }

    return NAME_REGEX.test(value) ? null : { nameFormat: true };
  };
};
