import "./commands";
import "../auth/commands";

describe("User api test suit", ()=>{

    const validUser = {
            "username" : "newUsername",
            "email"    : "new06Email@valid.com",
            "password" : "@1234Xyz"
        }

  //* Current User
  it("Should register a new user, do login, retrieve the current user and delete it", ()=>{

    cy.registerUser(validUser)
    .then( response => {
        
        cy.login(validUser)
        .then( response =>{
        
            const user = response.body.user;
            cy.getCurrentUser(user.token)
            .then(response => {
                expect(response.status).to.eq(200);

                const currentUser = response.body.user;
                expect(currentUser.username).to.eq(validUser.username);
                expect(currentUser.email).to.eq(validUser.email);
                
                cy.deleteUser(currentUser)
                .then(response => {
                    expect(response.status).to.eq(204);
                })
            })
        })
    })
  });
  
})