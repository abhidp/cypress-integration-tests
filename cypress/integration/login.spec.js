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

  it('should ask to sign up if the user does not exist', () => {
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

  it('should login successfully with correct credentials and get auth cookie', () => {
    cy.get('#loginForm').within(() => {
      cy.get('#email')
        .clear()
        .type('cypress@crate.com')
        .get('#password')
        .clear()
        .type('Pass1234');
      cy.contains('Login').click();
    });
    cy.title().should('eq', 'Crates for everyone! - Crate');
    cy.url().should('eq', `${Cypress.config().baseUrl}/crates`);
    cy.getCookie('auth').should('exist');

    cy.get('header')
      .should('contain', 'Crate')
      .and('contain', 'Crates')
      .and('contain', 'Subscriptions')
      .and('contain', 'Profile');
    cy.get('[data-test=HomePageBanner]')
      .should('contain', 'Crates for everyone!')
      .and(
        'contain',
        'You can choose crate which suits your need. You can also subscribe to multiple crates.'
      );
    cy.get('[data-test=CrateList]')
      .should('contain', 'Clothes for Men')
      .and('contain', 'A monthly supply of trendy clothes for men.');
  });
});
