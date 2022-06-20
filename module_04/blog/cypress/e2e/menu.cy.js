describe('Main menu', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('Login menu button is visible by default', () => {
        cy.get('#menu #login').should('exist');
    })

    it('Clicking the login menu button opens the login prompt', () => {
        cy.get('#menu #login').click()

        cy.get('#prompt').should('exist');
        cy.get('#prompt #header').should('contain', 'login user');
        cy.get('#prompt form input').should('have.length', 3)
    })

    it('Register menu button is not visible', () => {
        cy.get('#menu #register').should('exist');
    })

    it('Clicking the register menu button opens the register prompt', () => {
        cy.get('#menu #register').click()

        cy.get('#prompt').should('exist');
        cy.get('#prompt #header').should('contain', 'register user');
        cy.get('#prompt form input').should('have.length', 4)
    })

    it('Logout menu button is not visible', () => {
        cy.get('#menu #logout').should('not.exist');
    })

    it('Create blog menu button is not visible', () => {
        cy.get('#menu #create').should('not.exist');
    })
})