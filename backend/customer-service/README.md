# Customer Service Backend

## Overview

Spring Boot backend for customer registration feature.

## Endpoint

- `POST /api/v1/customers/register`

Success response:

```json
{
  "status": "success",
  "data": {
    "customerId": "uuid",
    "email": "user@example.com",
    "createdAt": "2026-01-01T00:00:00"
  }
}
```

Error response:

```json
{
  "status": "error",
  "error": {
    "errorCode": "VALIDATION_ERROR",
    "message": "Description"
  }
}
```

## Local Run

1. Ensure PostgreSQL is available.
2. Update `src/main/resources/application.yml` as needed.
3. Run backend:

```powershell
mvn spring-boot:run
```

## Tests

```powershell
mvn test
```

### Test Categories

- BE-011 unit tests:
  - `CustomerRegistrationServiceTest`
  - `RateLimitingServiceTest`
  - `PasswordHashingServiceTest`
- BE-012 integration test:
  - `CustomerRegistrationControllerIntegrationTest`

### Performance (BE-013)

See `PERFORMANCE_TEST_PLAN.md`.

## Logging

- Request logging interceptor captures method, URI, status, duration.
- Logback configuration writes console and rolling file output.
