import {buildUser} from '../support/generate'

describe('smoke', () => {
  it('should allow a typical user flow', () => {
    // 🐨 create a fake user
    const user = buildUser()
    // 🐨 visit '/' (📜 https://docs.cypress.io/api/commands/visit.html)
    cy.visit('/')
    cy.findByRole('button', {name: /register/i}).click()
    cy.findByRole('dialog').within(() => {
      cy.findByLabelText('Username').type(user.username)
      cy.findByLabelText('Password').type(user.password)
      cy.findByRole('button', {name: /register/i}).click()
    })

    // 🐨 within the "navigation", find the link named "discover" and click it
    cy.findByRole('navigation').within(() => {
      cy.findByRole('link', {name: /discover/i}).click()
    })

    cy.findByRole('main').within(() => {
      cy.findByRole('searchbox', {name: /search/i}).type('voice of war{enter}')
      cy.findByRole(/listitem/i, {name: /voice of war/i}).within(() => {
        cy.findByRole('button', {name: /add to list/i}).click()
      })
    })

    cy.findByRole('navigation').within(() => {
      cy.findByRole('link', {name: /reading list/i}).click()
    })

    cy.findByRole('main').within(() => {
      cy.findByRole('listitem').should('have.length', 1)
      cy.findByRole('listitem').within(() => {
        cy.findByRole('link', {name: /voice of war/i}).click()
      })
    })

    cy.findByRole('main').within(() => {
      cy.findByRole('textbox', {name: /notes/i}).type('this is e2e test')
      cy.findByLabelText(/loading/i).should('exist')
      cy.findByLabelText(/loading/i).should('not.exist')
      cy.findByRole('button', {name: /mark as read/i}).click()
      cy.findByRole('radio', {name: /5 stars/i}).click({force: true})
    })
    cy.findByRole('navigation').within(() => {
      cy.findByRole('link', {name: /finished books/i}).click()
    })

    cy.findByRole('main').within(() => {
      cy.findByRole('listitem').should('have.length', 1)
      cy.findByRole('radio', {name: /5 stars/i}).should('be.checked')
      cy.findByRole('link', {name: /voice of war/i}).click()
    })

    cy.findByRole('main').within(() => {
      cy.findByRole('button', {name: /remove from list/i}).click()
      cy.findByRole('textbox', {name: /notes/i}).should('not.exist')
      cy.findByRole('radio', {name: /5 stars/i}).should('not.exist')
    })

    cy.findByRole('navigation').within(() => {
      cy.findByRole('link', {name: /finished books/i}).click()
    })

    cy.findByRole('listitem').should('have.length', 0)

    cy.findByRole('button', {name: /logout/i}).click()
  })
})
