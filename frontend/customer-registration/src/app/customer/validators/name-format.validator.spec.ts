import { FormControl } from '@angular/forms';

import { nameFormatValidator } from './name-format.validator';

describe('nameFormatValidator', () => {
  it('accepts names with letters, spaces, and hyphens', () => {
    const control = new FormControl('Ana-Maria');
    const result = nameFormatValidator()(control);
    expect(result).toBeNull();
  });

  it('rejects names with numbers or symbols', () => {
    const control = new FormControl('User123');
    const result = nameFormatValidator()(control);
    expect(result).toEqual({ nameFormat: true });
  });
});
