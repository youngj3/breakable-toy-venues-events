it('returns the correct status code', () => {
  cy.request('/api/v1/venues/KovZpa2gne')
    .its('status')
    .should('be.equal', 200)
})

it("has the right property name property & value", () => {
  cy.request('/api/v1/venues/KovZpa2gne')
    .its("body")
    .its("venue")
    .should((venue) => {
      expect(venue).to.have.property("name", "TD Garden")
    })
})

it("has some events", () => {
  cy.request('/api/v1/venues/KovZpa2gne')
    .its("body")
    .its("venue")
    .should((venue) => {
      expect(venue).to.have.property("events")
    })
})