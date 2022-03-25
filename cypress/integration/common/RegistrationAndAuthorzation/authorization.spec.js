describe('authorization flow', () => {
    it('should login user with right email and password', () => {
        cy.visit('/')
        cy.contains(/sign in/i).click()

        cy.get('.authModal_content__1uCx2').within(() => {
            cy.get('input[type=text]').type('admin@born2die.com')
            cy.get('input[type=password]').type('admin')
            cy.contains(/sign in/i).click()
        })
        cy.get('[data-testid="btn-profile"]').should('be.visible')
    })
})
