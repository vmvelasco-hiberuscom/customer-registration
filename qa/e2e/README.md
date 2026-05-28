# INT-004 E2E Testing

## Run (example)
1. Start backend and frontend.
2. Install Cypress in a frontend-enabled environment:
   - npm install --save-dev cypress
3. Execute:
   - npx cypress run --config-file qa/e2e/cypress/cypress.config.js

## Specs
- qa/e2e/cypress/e2e/registration.cy.js

## Expected
- Valid flow shows success modal.
- Invalid flow shows validation summary.
