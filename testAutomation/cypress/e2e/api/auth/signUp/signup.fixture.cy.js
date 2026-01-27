import { API_AUTH_ENDPOINTS as endpoints} from "../endpoints";
import '../commands';
import '../../user/commands';

describe("Signup Test Suit using FIXTURES", ()=>{


    beforeEach(()=>{
        cy.fixture('auth/fixtures/users.fixtures.json').as('users')
        .then(massa=>{
            expect(massa).to.not.be.undefined;
            expect(massa.invalidUsers).to.be.a('array').and.to.not.be.empty;
            expect(massa.validUsers).to.be.a('array').and.to.not.be.empty;
        });
    })
    
    it('Should fail to signup with invalid user data', function (){

        this.users.invalidUsers
        .forEach( user =>{

            cy.registerUser(user)
            .then(response => {
                expect(response.isOkStatusCode).to.be.false;
                expect(response.status).to.eq(422);
                expect(response.body.errors.body).to.not.be.undefined
                const errors = response.body.errors.body;
                expect(errors).to.be.an('array').and.to.not.be.empty;
            });
        })
        
    })

    it('Should signup successfully', function (){

        this.users.validUsers
        .forEach( user =>{

            cy.registerUser(user)
            .then(response => {
            
                const body = response.body;
                expect(body).to.not.be.undefined;

                const credential = body.user;
                expect(credential).to.not.be.undefined;
                expect(credential).to.have.property('username', user.username);
                expect(credential).to.have.property('email', user.email);
                expect(credential).to.have.property('token').to.be.an('string').and.to.not.be.empty;

                cy.deleteUser(user)
                .then(response =>{
                    expect(response.status).to.eq(204);
                })
            })
        })
    })
})