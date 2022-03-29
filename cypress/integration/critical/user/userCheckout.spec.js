describe('User checkout route', () => {
  it('should provide user to form order', () => {
    cy.login(Cypress.env('consumerLogin'), Cypress.env('consumerPassword'));
    cy.visit('/products/50');
    
    cy.getByCyId('addToCartButton').click();
    cy.visit('/cart');
    cy.getByCyId('buyNowButton').click();

    cy.getByCyId('RadioGroupAddresses', { timeout: 10000 }).should('be.visible');
    cy.getByCyId('RadioGroupAddresses').get('label:first').click();

    cy.getByCyId('deliveryAddressButton').click();

    cy.getById('cardNumber').type('4957030420210462');
    cy.getById('expDate').type('1040');
    cy.getById('cvv').type('022');
    cy.getByCyId('payButton').click();
    cy.getByTestId('title', { timeout: 10000 }).should('be.visible');

    cy.visit('/profile/orders');
    cy.getByCyId('orderCard').should('have.length', 3);
  })
})
