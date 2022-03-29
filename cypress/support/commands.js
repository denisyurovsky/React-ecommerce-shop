Cypress.Commands.add('login', (email, password) => {
  const serverLoginUrl = `${Cypress.env('apiUrl')}/login`

  cy.request('POST', serverLoginUrl, {
    email,
    password
  })
  .its('body')
  .then((res) => {
    localStorage.setItem('accessToken', res.accessToken)
  })
})

Cypress.Commands.add('getByCyId', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args)
})

Cypress.Commands.add('getByTestId', (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args)
})

Cypress.Commands.add('getById', (selector, ...args) => {
  return cy.get(`[id=${selector}]`, ...args)
})

Cypress.Commands.add('getByLabelText', (text, ...args) => {
  return cy.get(`label`, ...args).contains(text)
})

Cypress.Commands.add('checkToastMessage', (message) => {
  cy.get('.Toastify__toast').should('contain', message);
});
