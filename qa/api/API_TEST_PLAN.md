# INT-001 API Testing Plan

## Scope
- POST /api/v1/customers/register

## Cases
1. Success registration returns 201 and status=success.
2. Validation error returns 400 and VALIDATION_ERROR.
3. Duplicate email returns 400 and DUPLICATE_EMAIL.
4. Rate limit returns 429 and RATE_LIMIT_IP or RATE_LIMIT_DOMAIN.

## Execution
- Use Postman collection: qa/api/customer-registration.postman_collection.json
- Optional: use REST Client file: qa/api/customer-registration.http

## Exit Criteria
- All planned assertions pass.
- No unexpected 500 responses in normal test flow.
