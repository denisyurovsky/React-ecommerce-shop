const wishlistName = 'New Wishlist';
const errorMessage = 'Wishlist name should be unique';

Cypress.Commands.add('createWishlist', (wishlistName) => {
  cy.getByCyId('addToWishlists').first().click();
  cy.getByCyId('addWishlistBtn').click();
  cy.get('#wishlist-name').type(wishlistName);
});

describe('Add product to wishlist route', () => {
  beforeEach(() => {
    cy.login(Cypress.env('consumerLogin'), Cypress.env('consumerPassword'));
  });

  it('should be able to add new wishlist', function () {
    cy.visit('/');
    cy.getByCyId('productName').first().invoke('text').as('productName');

    cy.createWishlist(wishlistName);
    cy.getByCyId('createBtn').click();
    cy.checkToastMessage(`"${wishlistName}" was successfully added`);
  });

  it('should not be able to add new wishlist if name is not unique', () => {
    cy.visit('/');

    cy.createWishlist(wishlistName);
    cy.getByTestId('formAddNewWishlist').should('contain', errorMessage);
  });

  it('product should be added to a new wishlist', function () {
    cy.visit('/profile/wishlist');
    cy.getByCyId('wishlistCard')
      .filter(`:contains(${wishlistName})`)
      .within(() => {
        cy.getByCyId('expandBtn').click();
      });

    cy.getByCyId('productName').should('have.text', this.productName);
  });

  it('should be able to remove wishlist', function () {
    cy.getByCyId('wishlistCard')
      .filter(`:contains(${wishlistName})`)
      .within(() => {
        cy.getByTestId('delete').click();
      });
    cy.contains('Yes').click();
    cy.getByCyId('wishlistCard').should('have.length', 4);
  });
});
