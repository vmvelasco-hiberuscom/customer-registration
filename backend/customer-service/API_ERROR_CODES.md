# API Error Codes

| Error Code | HTTP | Meaning |
|---|---|---|
| VALIDATION_ERROR | 400 | Request payload failed input validation |
| DUPLICATE_EMAIL | 400 | Email already exists for an active account |
| RATE_LIMIT_IP | 429 | IP-based registration rate limit exceeded |
| RATE_LIMIT_DOMAIN | 429 | Domain-based registration rate limit exceeded |
| DB_ERROR | 500 | Database-level error or data integrity issue |
| INTERNAL_SERVER_ERROR | 500 | Unhandled server-side error |
