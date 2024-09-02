// describe('Validar los POST', () => {

//     it('Crear user', () => {
//         cy.request({
//             url: "users",
//             method: "POST",
//             body: {
//                 name: "John Doe",
//                 email: "johndoe@example.com",
//                 status: "active"
//               },
//         }).then((resp) => {
//             expect(resp.status).to.eq(201)
//             expect(resp.body).to.have.property("id")

//             //guardar el id para validar que guardo
//             const id = resp.body.id 
//             cy.wrap(id).as("idNew")
//         })
//     })

//     it('Validar user creado', () => {
//         cy.request("GET", "users").then((resp) => {
//             const ids = resp.body.id 
//             cy.get("@idNew").then((idNew) => {
//                 expect(ids).to.include(idNew)
//             })
//         })
//     });
    
// });




describe('Validar los POST', () => {
    let idNew;

    before(() => {
        // Crear user y guardar el id
        cy.request({
            url: "users",
            method: "POST",
            body: {
                name: "John Doe",
                email: "johndoe@example.com",
                status: "active"
            },
        }).then((resp) => {
            expect(resp.status).to.eq(201);
            expect(resp.body).to.have.property("id");

            // Guardar el id en una variable global
            idNew = resp.body.id;
        });
    });

    it('Validar user creado', () => {
        cy.request("GET", "users").then((resp) => {
            const ids = resp.body.map(user => user.id); // Asegúrate de que `resp.body` es una lista de usuarios
            expect(ids).to.include(idNew);
        });
    });
});
