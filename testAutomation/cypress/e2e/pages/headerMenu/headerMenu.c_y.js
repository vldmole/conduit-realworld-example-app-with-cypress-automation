import { HEADER_ELEMENTS } from "./headerMenu.elements"; 

describe("Initial header menu elements test suit", ()=>{

    it("Should contain the minimal elements set", ()=>{

        cy.visit('/');

        cy.get(HEADER_ELEMENTS.conduitLink).should('be.visible');
        cy.get(HEADER_ELEMENTS.homeLink).should('be.visible');
        cy.get(HEADER_ELEMENTS.sourceCodeLink).should('be.visible');
        cy.get(HEADER_ELEMENTS.loginLink).should('be.visible');
        cy.get(HEADER_ELEMENTS.signupLink).should('be.visible');
    })

})