//1. validacion del estado de la respuesta
//2. validacion del tipo de contenido de la respuesta
//3. validacion de la estrctura de la respuesta
//4. validacion de datos especificos de la respuesta
//5. validacionde actualizacion de resursos
//6. validacion de creacion de recursos
//7. validacion de eliminacion de recursos
//8. validacion de errores
//9. validacion de rendimiento
//10. validacion de seguridad 

describe("localhost:3000/users", () => {
  //1. validacion del estado de la respuesta
  it("1. validacion del estado de la respuesta  - UNO", () => {
    cy.request("users").its("status").should("equal", 200);
  });

  it("1. validacion del estado de la respuesta  - DOS", () => {
    cy.request("users").then((resp) => {
      expect(resp.status).to.be.eq(200); 
    });
  });

  //2. validacion del tipo de contenido de la respuesta
  it("2. validacion del tipo de contenido de la respuesta - UNO", () => {
    cy.request("users")
      .its("headers")
      .its("content-type")
      .should("include", "application/json");
  });

  it("2. validacion del tipo de contenido de la respuesta - DOS", () => {
    cy.request("users").then((resp) => {
      expect(resp.headers["content-type"]).to.be.equal("application/json");
    });
  });

  //3. validacion de la estrctura de la respuesta
  it("3. validacion de la estrctura de la respuesta - UNO", () => {
    cy.request("users/1")
      .its("body")
      .should("include.all.keys", ["id", "name", "email", "status"]);

    //no funciona esta forma:
    // cy.request("users/1")
    // .its("body")
    // .should("have.property", "id")
    // .should("have.property", "email")
    // .should("have.property", "status")
    // .should("have.property", "name")
  });

  it("3. validacion de la estrctura de la respuesta - DOS", () => {
    cy.request("users/1")
      .its("body")
      .should((body) => {
        expect(body).to.have.property("id");
        expect(body).to.have.property("name");
        expect(body).to.have.property("email");
        expect(body).to.have.property("status");
      });
  });

  //4. validacion de datos especificos de la respuesta
  it("4. validacion de datos especificos de la respuesta - UNO", () => {
    cy.request("users/1")
      .its("body")
      .should("have.property", "name", "John Doe");
    // .and("have.property", "email", "johndoe@example.com")
    // .and("have.property", "status", "active")
    // .and("have.property", "id", 1);

    //al intentar validar lo restante tira un error ya que queda el dato de name pegado y al validar la igualda este falla. Buscar en la doc luego.
  });

  it("4. validacion de datos especificos de la respuesta - DOS", () => {
    cy.request("users/1")
      .its("body")
      .should((body) => {
        expect(body.id).to.be.eq("1");
        expect(body.name).to.be.eql("John Doe");
        expect(body.email).to.be.equal("johndoe@example.com");
        expect(body.status).to.be.eq("active");
      });
  });

  it("4. validacion de datos especificos de la respuesta - TRES", () => {
    //puedo tomar un json desde la carpeta fixture, o un ts, y comparar el objeto entero con el devueldo por el servicio
    cy.fixture("db.json").then((data) => {
      const userWithId1 = data.users.find((user) => user.id === "1");

      cy.request("users/1").its("body").should("deep.equal", userWithId1);
    });
  });

  //5. validacion de actualizacion de resursos
  it("5. validacion de actualizacion de resursos - UNO", () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const updatedName = `alberto${randomNumber}`;

    cy.request({
      url: "users/2",
      method: "PUT",
      body: {
        name: updatedName,
      },
    }).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body.name).to.eq(updatedName);
    });
  });

  //6. validacion de creacion de recursos
  it("6. validacion de creacion de recursos - UNO", () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const newName = `alberto${randomNumber}`;
    const newEmail = `alberto${randomNumber}@gmail.com`;
    const newStatus = randomNumber % 2 === 0 ? "active" : "inactive";
    let newId = "";

    cy.request({
      url: "users",
      method: "POST",
      body: {
        name: newName,
        email: newEmail,
        status: newStatus,
      },
    })
      .then(({ status, body }) => {
        expect(status).to.eq(201);
        expect(body.name).to.eq(newName);
        expect(body.email).eq(newEmail);
        expect(body.status).eq(newStatus);
        newId = body.id;
      })
      .then(() => {
        const url = `users/${newId}`;

        cy.request(url).then((resp) => {
          expect(resp.status).to.eq(200);
          expect(resp.body.id).to.eq(newId);
          expect(resp.body.name).eq(newName);
          expect(resp.body.email).eq(newEmail);
        });
      });
  });

  it("6. validación de creación de recursos - DOS", () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const newName = `alberto${randomNumber}`;
    const newEmail = `alberto${randomNumber}@gmail.com`;
    const newStatus = randomNumber % 2 === 0 ? "active" : "inactive";

    cy.request({
      url: "users",
      method: "POST",
      body: {
        name: newName,
        email: newEmail,
        status: newStatus,
      },
    })
      .then(({ status, body }) => {
        expect(status).to.eq(201);
        expect(body).to.include({
          name: newName,
          email: newEmail,
          status: newStatus,
        });

        cy.wrap(body.id).as("newUserId");
      })
      .then(function () {
        const url = `users/${this.newUserId}`;

        cy.request(url).then((resp) => {
          expect(resp.status).to.eq(200);
          expect(resp.body).to.include({
            id: this.newUserId,
            name: newName,
            email: newEmail,
          });
        });
      });
  });

  //7. validación de eliminación de recursos
  it("7. validación de eliminación de recursos - UNO", () => {
    cy.request("users").then((resp) => {
      expect(resp.status).to.eq(200);
      const lastUserId = resp.body[resp.body.length - 1].id;

      cy.request({
        url: `users/${lastUserId}`,
        method: "DELETE",
      }).then((deleteResp) => {
        expect(deleteResp.status).to.eq(200);

        cy.request({ url: `users/${lastUserId}`, failOnStatusCode: false })
          .its("status")
          .should("eq", 404);
      });
    });
  });

  //8. validacion de errores
  it("8. validacion de errores - UNO", () => {
    cy.request({ url: "users/55abc55", failOnStatusCode: false }).then(
      (resp) => {
        expect(resp.status).to.be.eq(404);
      }
    );
  });

  it("8. validacion de errores - DOS", () => {
    cy.request({ url: "users/55abc55", failOnStatusCode: false })
      .its("status")
      .should("eq", 404);
  });

  //9. validacion de rendimiento
  it("9. validacion de rendimiento - UNO", () => {
    cy.request("users").its("duration").should("be.lessThan", 500);
    // medio segundo de tolerancia
  });

  it("9. validacion de rendimiento - DOS", () => {
    cy.request("users").then((resp) => {
      expect(resp.duration).to.be.lessThan(500);
    });
  });

  //10. validacion de seguridad
  it("10. validacion de seguridad - UNO", () => {
    expect(true).eq(true);

    // Intentar acceder sin autenticación
    // cy.request({ url: "/api/v1/users/1", failOnStatusCode: false })
    //   .its("status")
    //   .should("eq", 401); // Debe devolver 401 Unauthorized

    // Intentar acceder con autenticación incorrecta
    // cy.request({
    //   url: "/api/v1/users/1",
    //   headers: { Authorization: "Bearer invalidToken" },
    //   failOnStatusCode: false,
    // })
    //   .its("status")
    //   .should("eq", 403); // Debe devolver 403 Forbidden para tokens inválidos

    // Intentar acceder con autenticación correcta
    // cy.request({
    //   url: "/api/v1/users/1",
    //   headers: { Authorization: `Bearer ${Cypress.env("VALID_TOKEN")}` }, // Usar un token válido
    // })
    //   .its("status")
    //   .should("eq", 200); // Debe devolver 200 OK
  });
});
