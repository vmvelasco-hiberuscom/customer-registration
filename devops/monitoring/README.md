# DevOps-004 Monitoring Setup

## Components
- Prometheus scrape config: prometheus.yml
- Alert rules: alerts.yml
- Grafana dashboard template: grafana/customer-service-dashboard.json
- Local stack compose file: docker-compose.monitoring.yml

## Startup
From devops/monitoring:

```powershell
docker compose -f docker-compose.monitoring.yml up -d
```

## Targets
- Customer service metrics endpoint: /actuator/prometheus
- Prometheus UI: http://localhost:9090
- Grafana UI: http://localhost:3000

## Core Metrics
- Request rate
- 5xx error rate
- Latency p95
- Database connection pool usage (if exported)
