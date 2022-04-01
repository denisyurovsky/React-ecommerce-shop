describe('creating an order and canceling', () => {
    it('should be able to create an order and cancel it', () => {
        cy.login('consumer1@gmail.com', '123456')

        cy.visit('/')
        cy.getByCyId('addToCartButton').eq(0).click()
        cy.getByTestId('ShoppingBasketIcon').click()
        cy.contains(/buy now/i).click()
        cy.get('input[type="radio"]').click()

        cy.contains(/proceed/i).click()
        cy.getByTestId('ProfileAvatar').click()
        cy.contains(/my orders/i).click()

        cy.getByCyId('orderCard').last().within(() => {
            cy.get('svg[data-testid=ExpandMoreIcon]').click()
            cy.contains(/cancel order/i).click()
        })
        cy.getByCyId('orderCardStatus').last().should('have.text', 'Cancelled');

    })
})