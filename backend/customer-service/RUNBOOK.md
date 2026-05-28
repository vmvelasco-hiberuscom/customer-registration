# Backend Runbook (BE-014)

## Build

```powershell
mvn clean compile
```

## Test

```powershell
mvn test
```

## Start

```powershell
mvn spring-boot:run
```

## Verify Endpoint

```powershell
curl -X POST "http://localhost:8080/api/v1/customers/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"demo@example.com\",\"firstName\":\"Demo\",\"lastName\":\"User\",\"password\":\"Strong1!\"}"
```

## Expected HTTP Codes

- `201`: registration created
- `400`: validation or duplicate email
- `429`: rate limit reached
- `500`: unexpected error

## Troubleshooting

- If startup fails on Flyway, verify migration files in `src/main/resources/db/migration`.
- If database connection fails, verify datasource URL/credentials in `application.yml`.
- If endpoint returns 401 unexpectedly, verify Spring Security configuration for public registration route.
