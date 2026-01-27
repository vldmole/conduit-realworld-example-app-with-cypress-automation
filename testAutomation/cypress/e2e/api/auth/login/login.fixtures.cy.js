

describe("Login API Test Suit using FIXTURES", ()=>{

    beforeEach(()=>{
        cy.fixture('auth/fixtures/users.fixture.json').as('users')
        .then(massa=>{
            expect(massa).to.not.be.undefined;
            expect(massa.invalidUsers).to.be.a('array').and.to.not.be.empty;
            expect(massa.validUsers).to.be.a('array').and.to.not.be.empty;
        });

    })

    it("Should fail with invalid users", function (){

        const users = this.users.invalidUsers; 
        cy.wrap(users).each((user) => {
            
            cy.login(user)
            .then(response=>{
                expect(response.status).to.not.be.eq(200);
                expect(response.body.errors).to.not.be.undefined;
                const errors = response.body.errors.body;
                expect(errors).to.not.be.undefined;
                expect(errors).to.be.an('array').and.to.not.be.empty;
            })
        });
    })
})