const feedback = 'Quis incididunt pariatur labore aliquip in culpa deserunt quis irure non irure.'
const userName = 'Test'

Cypress.Commands.add('fillFeedback', (userName, rating, feedback) => {
  cy.getByCyId('addFeedbackBtn').click()
  if (userName) {
    cy.getByCyId('feedbackName').type(userName)
  }
  cy.getByCyId('starRating')
    .children()
    .contains(`${rating} Star`)
    .parent()
    .click()
  cy.getByCyId('feedbackComment').type(feedback)
  cy.getByCyId('feedbackConfirmationBtn').click()
})

describe('Add feedback route', () => {
  beforeEach(() => {
    cy.login(Cypress.env('consumerLogin'), Cypress.env('consumerPassword'))
    cy.visit('/products/9')
  })

  it('should be able to add feedback to product', () => {
    cy.fillFeedback(userName, 1, feedback)

    cy.checkToastMessage('Your feedback has been added')
    cy.getByTestId('comments')
      .children(':first')
      .should('contain', feedback)
      .and('contain', userName)
  })

  it('should be able to add feedback anonymously', () => {
    cy.fillFeedback(null, 3, feedback)

    cy.checkToastMessage('Your feedback has been added')
    cy.getByTestId('comments')
      .children(':first')
      .should('contain', feedback)
      .and('contain', 'Anonymous')
  })
})
