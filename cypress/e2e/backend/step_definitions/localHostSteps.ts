import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

//-----------------DATA-------------------///
const userData = {
  name: "",
  email: "",
  status: "",
  newId: "",
};

//----------------------------------------//

When("el usuario realiza una solicitud GET a {string}", (endpoint: string) => {
  cy.request({
    url: Cypress.env("apiUrlBack") + endpoint,
    failOnStatusCode: false,
  }).as("apiResponse");
});

When(
  "el usuario realiza una solicitud PUT a {string} y cambia el nombre a {string}",
  (endpoint: string, updateName: string) => {
    cy.request({
      url: Cypress.env("apiUrlBack") + endpoint,
      method: "PUT",
      body: {
        name: updateName,
      },
    }).as("apiUpdate");
  }
);

When(
  "el usuario realiza una solicitud POST a {string} con los datos {string}",
  (endpoint: string, name: string) => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    userData.name = `${name}${randomNumber}`;
    userData.email = `${name}${randomNumber}@gmail.com`;
    userData.status = randomNumber % 2 === 0 ? "active" : "inactive";

    cy.request({
      url: Cypress.env("apiUrlBack") + endpoint,
      method: "POST",
      body: {
        name: userData.name,
        email: userData.email,
        status: userData.status,
      },
    }).as("apiCreate");
  }
);

When(
  "el usuario realiza una solicitud GET a {string} y obtiene el ID del ultimo usuario registrado",
  (endpoint: string) => {
    cy.request(Cypress.env("apiUrlBack") + endpoint)
      .then((resp) => {
        const count = resp.body.length - 1;

        expect(resp.status).to.eq(200);
        userData.newId = resp.body[count].id;
        userData.name = resp.body[count].name;
        userData.email = resp.body[count].email;
        userData.status = resp.body[count].status;
      })
      .as("apiGetId");
  }
);

When(
  "el usuario realiza una solicitud DELETE a {string} con el ID obtenido",
  (endpoint: string) => {
    cy.request({
      url: `${Cypress.env("apiUrlBack")}/users/${userData.newId}`,
      method: "DELETE",
    }).as("apiDelete");
  }
);

When(
  "el usuario realiza una solicitud GET a {string} con el ID eliminado",
  (endpoint: string) => {
    cy.request({
      url: Cypress.env("apiUrlBack") + endpoint + userData.newId,
      failOnStatusCode: false,
    }).as("apiResponse404");
  }
);
//-----------------------------------------------------------------------------------------------//

Then("la respuesta debe tener un estado {int}", (statusCode: number) => {
  cy.get("@apiResponse").its("status").should("equal", statusCode);
});

Then(
  "la respuesta debe tener un estado {int} otro metodo",
  (statusCode: number) => {
    cy.request("@apiResponse").then((resp) => {
      expect(resp.status).to.be.eq(statusCode);
    });
  }
);

Then(
  "la respuesta debe tener un tipo de contenido {string}",
  (contenType: string) => {
    cy.request("@apiResponse")
      .its("headers")
      .its("content-type")
      .should("include", contenType);
  }
);

Then(
  "la respuesta debe tener un tipo de contenido, otro metodo {string}",
  (contenType: string) => {
    cy.request("@apiResponse").then((resp) => {
      expect(resp.headers["content-type"]).to.be.include(contenType);
    });
  }
);

Then(
  "La respuesta debe tener los siguientes elementos {string} {string} {string} {string}",
  (id: string, name: string, email: string, status: string) => {
    cy.get("@apiResponse");
    //   .its("body")
    //   .should("include.all.keys", [id, name, email, status]);
  }
);

Then(
  "La respuesta debe tener los siguientes elementos {string} {string} {string} {string} otro metodo",
  (id: string, name: string, email: string, status: string) => {
    cy.get("@apiResponse")
      .its("body")
      .should((body) => {
        expect(body).to.have.property(id);
        expect(body).to.have.property(name);
        expect(body).to.have.property(email);
        expect(body).to.have.property(status);
      });
  }
);

Then(
  "La respuesta debe tener los siguientes elementos y datos {string} {string} {string} {string}",
  (id: string, name: string, email: string, status: string) => {
    cy.get("@apiResponse").its("body").should("deep.eq", {
      id: id,
      name: name,
      email: email,
      status: status,
    });
  }
);

Then(
  "La respuesta debe tener los siguientes elementos y datos {string} {string} {string} {string} otro metodo",
  (id: string, name: string, email: string, status: string) => {
    cy.get("@apiResponse")
      .its("body")
      .should((body) => {
        expect(body.id).to.be.eq(id);
        expect(body.name).to.be.eql(name);
        expect(body.email).to.be.equal(email);
        expect(body.status).to.be.eq(status);
      });
  }
);

Then(
  "La respuesta debe tener los siguientes elementos y datos {string} {string} {string} {string} otro metodo tres",
  (id: string, name: string, email: string, status: string) => {
    cy.fixture("db.json").then((data) => {
      const userWithId1 = data.users.find((user) => user.id === "3");

      cy.get("@apiResponse").its("body").should("deep.equal", userWithId1);
    });
  }
);

Then(
  "Debe actualizar y tener dentro de la respuesta el nombre {string}",
  (name: string) => {
    cy.get("@apiUpdate").then((resp) => {
      // @ts-ignore
      expect(resp.status).to.eq(200);
      // @ts-ignore
      expect(resp.body.name).to.eq(name);
    });
  }
);

Then("Crea un nuevo usuario con los datos proporcionados", () => {
  cy.get("@apiCreate")
    .then((resp) => {
      // @ts-ignore
      expect(resp.status).to.eq(201);
      // @ts-ignore
      expect(resp.body.name).to.eq(userData.name);
      // @ts-ignore
      expect(resp.body.email).to.eq(userData.email);
      // @ts-ignore
      expect(resp.body.status).to.eq(userData.status);
      // @ts-ignore
      userData.newId = resp.body.id;
    })
    .then(() => {
      const url = `${Cypress.env("apiUrlBack")}/users/${userData.newId}`;

      cy.request(url).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body.id).to.eq(userData.newId);
        expect(resp.body.name).eq(userData.name);
        expect(resp.body.email).eq(userData.email);
        expect(resp.body.status).eq(userData.status);
      });
    });
});

Then("Crea un nuevo usuario con los datos proporcionados, otro metodo", () => {
  cy.get("@apiCreate")
    .then((resp) => {
      // @ts-ignore
      expect(resp.status).to.eq(201);
      // @ts-ignore
      expect(resp.body).to.include({
        name: userData.name,
        email: userData.email,
        status: userData.status,
      });
      // @ts-ignore
      cy.wrap(resp.body.id).as("newUserId");
    })
    .then(function () {
      const url = `${Cypress.env("apiUrlBack")}/users/${this.newUserId}`;

      cy.request(url).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body).to.include({
          id: this.newUserId,
          name: userData.name,
          email: userData.email,
        });
      });
    });
});

Then("se valida que el ID existe", () => {
  cy.get("@apiGetId").then(() => {
    cy.request(Cypress.env("apiUrlBack") + "/users/" + userData.newId).then(
      (resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body).to.include({
          id: userData.newId,
          name: userData.name,
          email: userData.email,
          status: userData.status,
        });
      }
    );
  });
});

Then("se valida que la respuesta sea un 200", () => {
  cy.get("@apiDelete").then((resp) => {
    // @ts-ignore
    expect(resp.status).to.eq(200);
  });
});

Then(
  "se valida que la respuesta es un 404 Not Found {string}",
  (alias: string) => {
    cy.get(alias).then((resp) => {
      // @ts-ignore
      expect(resp.status).to.eq(404);
    });
  }
);

Then(
  "se valida que la respuesta es un 404 Not Found {string} otro metodo",
  (alias: string) => {
    cy.get(alias).its("status").should("eq", 404);
  }
);

Then(
  "se valida que la duracion de la respuesta sea inferior a {int}",
  (duracion: number) => {
    cy.get("@apiResponse").its("duration").should("be.lessThan", duracion);
  }
);

Then(
  "se valida que la duracion de la respuesta sea inferior a {int} otro metodo",
  (duracion: number) => {
    cy.get("@apiResponse").then((resp) => {
      // @ts-ignore
      expect(resp.duration).to.be.lessThan(duracion);
    });
  }
);
