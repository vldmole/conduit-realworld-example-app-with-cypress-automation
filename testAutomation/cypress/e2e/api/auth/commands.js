
import {API_AUTH_ENDPOINTS as endpoints} from './endpoints';

Cypress.Commands.add("registerUser", (userData)=>{
    cy.request({
        method: 'POST',
        url: endpoints.signup, 
        body: { user : userData },
        failOnStatusCode: false
    })
})

Cypress.Commands.add("deleteUser", (userData)=>{
    cy.request({
        method: 'DELETE',
        url: endpoints.user, 
        body: { user : userData },
        failOnStatusCode: false
    })
}) 

Cypress.Commands.add("login", (userData) => {
    
    cy.request({
        method: 'POST',
        url: endpoints.login, 
        body: { user : userData },
        failOnStatusCode: false
    })
})