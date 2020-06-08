/// <reference types="cypress" />

context('Login', () => {
  it('can log in to the website', () => {
    cy.visit('http://localhost:3000/profile');
    cy.get('main').should(($p) => {
      expect($p).to.contain('Please login');
    });
    cy.get('header button').click();
    cy.get('main').should(($p) => {
      expect($p).to.contain('Karl');
    });
  });
});
