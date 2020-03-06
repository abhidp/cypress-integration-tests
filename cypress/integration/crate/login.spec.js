describe('should navigate through onboarding till signup page', () => {
  it('should visit the onboarding page and validate elements', () => {
    cy.visit('/');
    cy.title().should(
      'eq',
      'Monthly supply of clothes and accessories for Men and Women - Crate'
    );
    cy.get('h1')
      .should('contain.text', 'Welcome to Crate')
      .get('h6')
      .should(
        'contain.text',
        'Your monthly subscription of trendy  clothes and accessories'
      );
    cy.contains('Next').should('be.visible');
  });

  it("should click the next button to move to men's section of onboarding page", () => {
    cy.contains('Next').click();
    cy.title().should(
      'eq',
      'Monthly supply of clothes and accessories for Men and Women - Crate'
    );
    cy.get('h1')
      .should('contain.text', 'For Men')
      .get('h6')
      .should(
        'contain.text',
        'Your monthly subscription of trendy  clothes and accessories'
      );
    cy.contains('Next').should('be.visible');
  });

  it("should click the next button to move to the women's section of onboarding page", () => {
    cy.contains('Next').click();
    cy.title().should(
      'eq',
      'Monthly supply of clothes and accessories for Men and Women - Crate'
    );
    cy.get('h1')
      .should('contain.text', 'For Women')
      .get('h6')
      .should(
        'contain.text',
        'Your monthly subscription of trendy  clothes and accessories'
      );
    cy.contains('Next').should('be.visible');
  });

  it('should click on the next button to proceed to the start page', () => {
    cy.contains('Next').click();
    cy.title().should(
      'eq',
      'Monthly supply of clothes and accessories for Men and Women - Crate'
    );
    cy.get('h1')
      .should('contain.text', 'Fix me up')
      .get('h6')
      .should('contain.text', 'Subscribe to your crate!');
    cy.contains('Start').should('be.visible');
  });

  it('should click on start to proceed to signup page', () => {
    cy.contains('Start').click({ force: true });
    cy.url().should('eq', `${Cypress.config().baseUrl}/user/signup`);
    cy.get('#app')
      .should('contain', 'Crate')
      .and('contain', 'Men')
      .and('contain', 'Women')
      .and('contain', 'How It Works')
      .and('contain', "What's New")
      .and('contain', 'Login')
      .and('contain', 'Signup')
      .and('contain', 'Create an account');

    cy.get('input[name=name]')
      .should('be.visible')
      .and('not.be.disabled')
      .get('input[name=email]')
      .should('be.visible')
      .and('not.be.disabled')
      .get('input[name=password]')
      .should('be.visible')
      .and('not.be.disabled');

    cy.contains('Login')
      .should('not.be.disabled')
      .and('have.attr', 'href', '/user/login');
  });
});
