import { FormControl } from '@angular/forms';

import { emailFormatValidator } from './email-format.validator';

describe('emailFormatValidator', () => {
  it('accepts valid emails', () => {
    const control = new FormControl('user@example.com');
    const result = emailFormatValidator()(control);
    expect(result).toBeNull();
  });

  it('rejects invalid emails', () => {
    const control = new FormControl('not-an-email');
    const result = emailFormatValidator()(control);
    expect(result).toEqual({ emailFormat: true });
  });
});
