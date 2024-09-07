import { fakerES as faker } from "@faker-js/faker";

describe("Test components", () => {
  it("text-box", () => {
    const name = faker.person.firstName();
    const email = faker.internet.email();
    const address = faker.location.city();
    const address2 = faker.location.direction();

    cy.visit("/text-box");
    cy.get("#userName").type(name);
    cy.get("#userEmail").type(email);
    cy.get("#currentAddress").type(address);
    cy.get("#permanentAddress").type(address2);
    cy.get("#submit").click();

    // cy.get("#name")
    //   .should("exist")
    //   .then((resp) => {
    //     expect(resp.text()).to.include(name);
    //   });

    cy.get("#name").should("exist").and("contain", name);
    cy.get("#email").should("exist").and("contain", email);
    cy.get("#output #currentAddress").should("exist").and("contain", address);
    cy.get("#output #permanentAddress")
      .should("exist")
      .and("contain", address2);
  });

  it.only("checkbox", () => {
    cy.visit("/checkbox");
    cy.get("[for^=tree-node]").should("have.length", 1);
    cy.get('[aria-label="Expand all"]').click();
    cy.get("[for^=tree-node]").should("have.length", 17);

    cy.get("[type=checkbox]").eq(0).check({ force: true });
    cy.get("[type=checkbox]").eq(0).should("be.checked");

    cy.get("[type=checkbox]").eq(5).uncheck({ force: true });
    cy.get("[type=checkbox]").eq(5).should("not.be.checked");

    const labels = [];
    //iterar por todos los elementos y guardar el texto en un array
    cy.get("[for^=tree-node]:has(.rct-icon-check)").each((elem) => {
      labels.push(elem.text());
    });

    const successText = [];
    //iterar por todos los elementos y guardar el texto en un array
    cy.get("#result .text-success")
      .each((elem) => {
        successText.push(elem.text());
      })
      .then(() => {
        //poner todo en minusculas y quitar los espacios, y el .doc de algunas palabras.
        const checksLabels = labels.map((text) =>
          text.toLowerCase().replace(" ", "").replace(".doc", "")
        );
        //colocar todo minusculas
        const displayedTexts = successText.map((text) => text.toLowerCase());
        expect(displayedTexts).to.be.eqls(checksLabels);
      });
  });
});
