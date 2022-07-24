describe('Notifications', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('There is one visible notification at first', () => {
        cy.get('#notifications .item').should('have.length', 1)
    })

    it('It has the correct text', () => {
        cy.get('#notifications .item').should('contain', 'Blogs fetched successfully.')
    })

    it('It eventually becomes hidden', () => {
        cy.get('#notifications .item').should('have.css', 'display', 'none')
    })
})