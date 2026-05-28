# INT-002 Frontend-Backend Integration Checklist

## Prerequisites
- Backend running at http://localhost:8080
- Frontend running at http://localhost:4200
- PostgreSQL reachable by backend

## Test Flow
1. Open registration page.
2. Submit valid form data.
3. Verify success modal appears.
4. Verify backend returns 201.
5. Verify customer row exists in database.

## Error Flows
- Invalid input displays validation message and no unhandled console errors.
- Duplicate email returns user-facing duplicate message.
- Rate limiting returns user-facing throttling message.

## Evidence
- Screenshots of success and error flows.
- Network capture for API request/response.
- DB query result sample.
