import { FormControl } from '@angular/forms';

import { passwordStrengthValidator } from './password-strength.validator';

describe('passwordStrengthValidator', () => {
  it('accepts strong passwords', () => {
    const control = new FormControl('Strong1!');
    const result = passwordStrengthValidator()(control);
    expect(result).toBeNull();
  });

  it('rejects weak passwords', () => {
    const control = new FormControl('weakpassword');
    const result = passwordStrengthValidator()(control);
    expect(result).toEqual({ passwordStrength: true });
  });
});
