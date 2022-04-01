describe('creating an order and canceling', () => {
    it('should be able to create an order and cancel it', () => {
        cy.login('consumer1@gmail.com', '123456')

        cy.visit('/')
        cy.getByCyId('addToCartButton').eq(0).click()
        cy.getByTestId('ShoppingBasketIcon').click()
        cy.contains(/buy now/i).click()
        cy.get('input[type="radio"]').click()
        cy.contains(/proceed/i).click()
        cy.get('[id="cardNumber"]').type('4957030420210462')
        cy.get('[id="expDate"]').type('1040')
        cy.get('[id="cvv"]').type('022')
        cy.contains('Pay 590.25 $').click()

        cy.contains('Thank you!', { timeout: 10000 }).should('be.visible')

        cy.getByTestId('ProfileAvatar').click()
        cy.contains(/my orders/i).click()

        cy.getByCyId('orderCard').last().within(() => {
            cy.get('svg[data-testid=ExpandMoreIcon]').click()
            cy.contains(/confirm delivery/i).click()
        })
        cy.getByCyId('orderCardStatus').last().should('have.text', 'Delivered');
    })
})