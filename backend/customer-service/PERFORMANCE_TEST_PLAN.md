# Performance Test Plan (BE-013)

## Goal

Validate registration endpoint performance against targets:
- P95 latency <= 2 seconds
- Error rate < 1%
- Sustained load around 50+ requests/second

## Prerequisites

1. Backend running at `http://localhost:8080`
2. PostgreSQL available with migrated schema
3. k6 installed (`choco install k6` or equivalent)

## Scenario

- Script: `src/test/performance/registration-load-test.js`
- Virtual users: 100
- Duration: 60 seconds
- Payload: randomized email per iteration

## Run

```powershell
k6 run src/test/performance/registration-load-test.js
```

## Expected Outcome

- `http_req_duration p(95) < 2000`
- `http_req_failed rate < 0.01`
- No sustained server 500 responses

## Notes

- 400/429 responses are considered acceptable under stress due to validation and rate-limiting constraints.
- Run this test in an isolated environment to avoid polluting production metrics.
