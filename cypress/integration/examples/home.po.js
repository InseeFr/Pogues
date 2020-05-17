export default {
  goTo() {
    cy.visit(Cypress.env('EXTERNAL_API'), {
      onBeforeLoad(window) {
        delete window.fetch;
      },
    });
  },
  getFilterInput() {
    return cy.get('.form-control');
  },
  getListItems() {
    return cy.get('.questionnaire-list_item');
  },
};
