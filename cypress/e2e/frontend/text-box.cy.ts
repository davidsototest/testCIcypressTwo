describe("Test", () => {

  it("text-box", () => {
    cy.log('getIframeBody')
    cy.visit("/text-box");
    cy.get("#userName").type("Nombre")

  });
});
