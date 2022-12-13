describe("calculate feature",()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:5173/")
        cy.get("[placeholder=Operand one]").clear()
        cy.get("[placeholder=Operand two]").clear()
    })

        
    it("should get the page content", () => {
        cy.get("#_calculate_page").should("exist")
        cy.get("[action=calculate]").should("exist")
    })

    it("should return an error on nothing submitted", () => {
        cy.get("[action=calculate]").click()
    
        cy.get("#ErrorMessage").should("exist")
        cy.get("#ErrorMessage").contains("All fields are required")
    })

    it("On success things will work fine", () => {
        
        cy.get("[placeholder=Operand one]").type("20")
        cy.get("[placeholder=Operand two]").type("2")
        
        
        cy.get("[action=calculate]").click()
        
        cy.get("#SuccessMessage").should("exist")
        cy.get("#SuccessMessage").should("include.text", "Sucessfully")
    })
})