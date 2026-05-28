# Customer Registration Frontend

## Overview

Angular customer registration UI for feature 001-alta-cliente-basico.

## Main Flow

1. User opens `/registration`.
2. User submits form with name, email, password, password confirmation, and terms acceptance.
3. Frontend calls `POST /api/v1/customers/register`.
4. UI shows loading state, then success modal or error notification.

## Key Components

- `RegistrationPageComponent`: container and orchestration.
- `RegistrationFormComponent`: reactive form and client validation.
- `ValidationSummaryComponent`: aggregated error list.
- `SuccessModalComponent`: success feedback.
- `LoadingSpinnerComponent`: in-flight feedback.

## Validation

- `email-format.validator.ts`
- `name-format.validator.ts`
- `password-strength.validator.ts`

## HTTP Layer

- `CustomerRegistrationService` for API calls.
- `LoadingInterceptor` for request lifecycle.
- `ErrorInterceptor` for centralized error notifications.

## Accessibility Notes

- Labels and error associations are provided for all controls.
- Alerts and notifications use live regions.
- Focusable controls maintain visible focus indicators.
- Layout is responsive for mobile and desktop.

## Local Run

1. Install dependencies: `npm install`
2. Start dev server: `ng serve`
3. Run unit tests: `ng test`
4. Build: `ng build`
