/// <reference types="cypress" />
import HomePage from './home.po';

context('Demo Cypress', () => {
  beforeEach(() => {
    HomePage.goTo();
    //cy.injectAxe();
  });

  it('should have the title Pogues', () => {
    cy.get('.header-homepage').should('include.text', 'Pogues');
  });

  it('should filter the list and do the redirection', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:5000/questionnaires/search?owner=FAKEPERMISSION',
      response: 'fixture:questionnaires',
    });

    cy.filterQuestionnaire('Cypress');

    //cy.percySnapshot();
    //cy.checkA11y();

    HomePage.getListItems().should('have.length', 0);
    cy.get('.form-control').clear();
    HomePage.getListItems().should('have.length', 1);

    cy.get('.questionnaire-list_item a').click();
    cy.get('h4').should('have.text', 'Questionnaire Cypress');
  });
});
