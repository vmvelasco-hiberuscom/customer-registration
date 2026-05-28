# INT-003 Database Integration Checklist

## SQL Validation Queries

### Duplicate email check
```sql
SELECT COUNT(*) FROM customers WHERE LOWER(email)=LOWER('existing@example.com') AND status='active';
```

### IP rate limit check
```sql
SELECT COUNT(*)
FROM customers
WHERE ip_address_registered='127.0.0.1'
  AND registration_date > NOW() - INTERVAL '10 minutes'
  AND status='active';
```

### Domain rate limit check
```sql
SELECT COUNT(*)
FROM customers
WHERE split_part(LOWER(email), '@', 2)='example.com'
  AND registration_date > NOW() - INTERVAL '30 minutes'
  AND status='active';
```

### Audit coverage
```sql
SELECT status, failure_reason, COUNT(*)
FROM audit_logs
GROUP BY status, failure_reason
ORDER BY status, failure_reason;
```

## Exit Criteria
- Unique email enforced.
- IP/domain limits enforce thresholds.
- Audit logs exist for both success and failure scenarios.
