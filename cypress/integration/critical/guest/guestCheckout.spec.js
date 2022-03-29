describe('Guest checkout route', () => {
  it('should provide guest to form order', () => {
    cy.login(Cypress.env('consumer2Login'), Cypress.env('consumerPassword'))
    cy.visit('/products/50')
    
    cy.getByCyId('addToCartButton').click();
    cy.visit('/cart');
    cy.getByCyId('buyNowButton').click();

    cy.getByLabelText('Title').parent().click();
    cy.get('li').contains('Mr.').click();
    cy.getByLabelText('Phone').type('79811642937');
    cy.getByTestId('personalInformationButton').click();

    cy.getByLabelText('Country').parent().click();
    cy.get('li').contains('Russian Federation').click();

    cy.getByLabelText('City').parent().click();
    cy.get('li').contains('Aban').click();

    cy.getByLabelText('Street').type('Nevskiy');
    cy.getByLabelText('Building').type('123');
    cy.getByLabelText('Flat').type('22');
    cy.getByLabelText('Zip').type('123321');
    cy.getByTestId('personalAddressButton').click();

    cy.getById('cardNumber').type('4957030420210462');
    cy.getById('expDate').type('1040');
    cy.getById('cvv').type('022');
    cy.getByCyId('payButton').click();
    cy.getByTestId('title', { timeout: 10000 }).should('be.visible');

    cy.visit('/profile/orders')
    cy.getByCyId('orderCard').should('have.length', 6);
  })
})
