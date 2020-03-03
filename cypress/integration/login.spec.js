describe('should error out when logging with incorrect credentials', () => {
  before('navigate to login page', () => {
    cy.visit('/user/login');
  });

  it('should contain all the input-fields and field-attributes on the login page', () => {
    cy.contains('Login to your account')
      .should('be.visible')
      .get('#loginForm')
      .should('be.visible')
      .get('#email')
      .should('have.attr', 'placeholder', 'Email')
      .get('#password')
      .should('have.attr', 'placeholder', 'Password');
  });

  it('should ask to sign up if user doesnt exist', () => {
    cy.get('#loginForm').within(() => {
      cy.get('#email')
        .type('does.not.exist@email.com')
        .get('#password')
        .type('wrong-password');
      cy.contains('Login').click();
    });
    cy.contains(
      'We do not have any user registered with does.not.exist@email.com email address. Please signup.'
    ).should('be.visible');
  });
});
