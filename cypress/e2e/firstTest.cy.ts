describe('first app load', () => {
  it('loads the app when accessing link', () => {
    cy.visit('https://youngblood.vercel.app/')
  })
})