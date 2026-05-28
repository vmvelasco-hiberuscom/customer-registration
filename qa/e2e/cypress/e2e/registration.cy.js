describe('Customer registration', () => {
  it('submits a valid registration', () => {
    cy.visit('/registration');

    cy.get('#email').type(`e2e-${Date.now()}@example.com`);
    cy.get('#firstName').type('Cypress');
    cy.get('#lastName').type('Tester');
    cy.get('#password').type('Strong1!');
    cy.get('#confirmPassword').type('Strong1!');
    cy.get('#termsAccepted').check();

    cy.contains('button', 'Register').click();
    cy.contains('Registration Successful').should('be.visible');
  });

  it('shows validation errors for invalid input', () => {
    cy.visit('/registration');
    cy.contains('button', 'Register').click();
    cy.contains('Please fix the following fields:').should('be.visible');
  });
});
