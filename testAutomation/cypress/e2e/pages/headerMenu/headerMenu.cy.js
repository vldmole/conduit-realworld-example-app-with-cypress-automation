import { HEADER_ELEMENTS } from "./headerMenu.elements"; 

describe("Initial header menu elements test suit", ()=>{

    it("Should contain the minimal elements set", ()=>{

        cy.visit('/');
        cy.get(HEADER_ELEMENTS.loginLink).should('be.visible');
    })

})