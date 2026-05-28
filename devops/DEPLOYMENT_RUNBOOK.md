# DevOps-003 Deployment Runbook

## Environments
- local
- dev
- staging
- production

## Release Steps
1. Build backend artifact:
   - mvn clean package
2. Build container image:
   - docker build -t customer-service:tag backend/customer-service
3. Push image to registry.
4. Deploy stack with environment-specific configuration.
5. Run smoke test on /actuator/health and registration endpoint.

## Required Environment Variables
- SPRING_DATASOURCE_URL
- SPRING_DATASOURCE_USERNAME
- SPRING_DATASOURCE_PASSWORD
- SERVER_PORT

## Rollback Strategy
1. Keep previous image tag available.
2. Re-deploy previous stable tag.
3. Validate health endpoint and API smoke tests.
4. Capture post-mortem notes.
