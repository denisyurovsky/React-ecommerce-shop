describe('Add feedback route', () => {
    it('should be able to add feedback to product', () => {
        cy.visit('/')
        cy.contains(/sign in/i).click()

        cy.contains(/sign up/i).click()

        cy.get('.authModal_content__1uCx2').within(() => {
            cy.get('input').eq(0).type('New')
            cy.get('input').eq(1).type('User')
            cy.get('input').eq(2).type('newUser@gmail.com')
            cy.get('input').eq(3).type('StrongPassword1!')
            cy.get('input').eq(5).type('StrongPassword1!')
            cy.contains(/sign up/i).click()
        })
        cy.get('[data-testid="btn-profile"]').should('be.visible')
    })
})
