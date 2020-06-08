/// <reference types="cypress" />

context('Navigation', () => {
  it('can navigate around the website', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-cy="header-link-about"]').click(
      // Use force: true to avoid "detached from DOM" error
      // https://github.com/cypress-io/cypress/issues/5743#issuecomment-622596999
      { force: true },
    );
    cy.get('main:contains("About")');

    cy.get('[data-cy="header-link-products"]').click(
      // Use force: true to avoid "detached from DOM" error
      // https://github.com/cypress-io/cypress/issues/5743#issuecomment-622596999
      { force: true },
    );
    cy.get('main h1:contains("Products")');

    cy.get('[data-cy="header-link-users"]').click(
      // Use force: true to avoid "detached from DOM" error
      // https://github.com/cypress-io/cypress/issues/5743#issuecomment-622596999
      { force: true },
    );
    cy.get('main h1:contains("Users")');
    cy.get('main ul li:first-child a').click(
      // Use force: true to avoid "detached from DOM" error
      // https://github.com/cypress-io/cypress/issues/5743#issuecomment-622596999
      { force: true },
    );
    // This SHOULD be the same as the line below,
    // but the line below was not working with my
    // dev server
    // cy.get('main h1').contains('Hamed');
    cy.get('main h1:contains("Hamed")');
    cy.get('main > p:first-of-type').contains('id:').contains('1');
  });
});
