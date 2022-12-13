import Input "../components/Input"

describe('check if it mounts with no errors', () => {
    it('mounts', () => {
      cy.mount(<Input />)
    })
  })