describe("Test", () => {
  //   beforeEach(() => {
  //     cy.visit(Cypress.env("apiUrl"));
  //   });

  it("text-box", () => {
    // cy.intercept('**/*', { log: false });
    cy.on('uncaught:exception', (err, runnable) => {
        // Si el error es "Script error." ignorarlo
        if (err.message.includes('Script error.')) {
          return false;
        }
        // Si no, deja que Cypress maneje el error como lo haría normalmente
      });
    cy.visit(`${Cypress.env("apiUrl")}text-box`);
    cy.get("#userName").type("Nombre")

  });
});
