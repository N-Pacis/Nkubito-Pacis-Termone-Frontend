import Button "../components/Button"

describe('check if it mounts with no errors', () => {
    it('mounts', () => {
      cy.mount(<Button />)
    })
  })