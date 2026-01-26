import {API_USER_ENDPOINTS as endpoints} from './endpoints';

Cypress.Commands.add("getCurrentUser", (token)=>{
    cy.request({
        method: 'GET',
        url: endpoints.base,
        headers: {
            "authorization": `Token ${token}`,
            "Content-Type": "application/json",
        },
        body: {
            loggedUser: token
        },
        loggedUser: token,
        failOnStatusCode: false
    })
}) 

Cypress.Commands.add("deleteUser", (userData)=>{
    cy.request({
        method: 'DELETE',
        url: endpoints.base, 
        body: { user : userData },
        failOnStatusCode: false
    })
}) 

