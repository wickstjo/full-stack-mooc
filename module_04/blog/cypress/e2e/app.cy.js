describe('Baseline', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('Renders four blog items', () => {
        cy.get('.blog_wrapper').should('have.length', 4)
    })

    it('Prompt component is not visible', () => {
        cy.get('#prompt').should('not.exist');
    })
})