describe("Test", () => {

  it("text-box", () => {
    cy.visit("/text-box");
    cy.get("#userName").type("Nombre")

  });
});
