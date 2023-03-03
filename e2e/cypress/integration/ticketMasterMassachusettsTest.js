it('returns the correct status code', () => {
  cy.request('/api/v1/venues?state=MA')
    .its('status')
    .should('be.equal', 200)
})

it('loads 20 venues', () => {
  cy.request('/api/v1/venues?state=MA')
  .its('body')
  .its('venues')
  .should('have.length', 20)
})

it("has the right property name property & value", () => {
  cy.request('/api/v1/venues?state=MA')
    .its("body")
    .its("venues")
    .should((venues) => {
      expect(venues[0]).to.have.property("name", "TD Garden")
    })
})

it('returns correct state', () => {
  cy.request('/api/v1/venues?state=MA')
  .its('body')
  .its('venues')
  .should((venues) => {
    expect(venues[17]).to.have.property('state', 'MA')
  })
})