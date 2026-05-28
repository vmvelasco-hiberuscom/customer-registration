# Frontend Testing Notes (FE-011)

## Added Unit Specs

- Validators:
  - `email-format.validator.spec.ts`
  - `name-format.validator.spec.ts`
  - `password-strength.validator.spec.ts`
- Service:
  - `customer-registration.service.spec.ts`
- Components:
  - `registration-form.component.spec.ts`
  - `registration-page.component.spec.ts`

## Run

```powershell
ng test
```

## Coverage Focus

- Form validity paths and event emissions.
- API call payload and endpoint assertions.
- Notification and modal orchestration.
- Validator pass/fail expectations.
