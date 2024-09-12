// import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { loginPage } from "../../../pages/LoginPage";

Given("Ingreso a la web de login page", () => {
  cy.visit({url: "https://www.saucedemo.com", failOnStatusCode: false});
}); 

When(
  "El usuario ingresa su userName {string}, y su contrasenia {string} y hace clic en login",
  (username: string, password: string) => {
    loginPage.submitLogin(username, password);
  }
);

Then("La web permite el ingreso y muestra el catalogo de inventario", () => {
  cy.url().should("contains", "/inventory.html");
});
