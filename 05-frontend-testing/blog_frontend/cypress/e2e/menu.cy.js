describe('Without user session', () => {

    // FIRST, INITIALIZE
    before(() => {
        cy.init()
    })

    it('Login menu button is visible', () => {
        cy.get('#menu #login').should('exist');
    })
    
    it('Register menu button is visible', () => {
        cy.get('#menu #register').should('exist');
    })
    
    it('Logout menu button is hidden', () => {
        cy.get('#menu #logout').should('not.exist');
    })

    it('Create blog menu button is hidden', () => {
        cy.get('#menu #create').should('not.exist');
    })
})

describe('With user session', () => {
    
    // FIRST, INITIALIZE & AUTH
    before(() => {
        cy.init()
        cy.register_and_login()
    })

    it('Login menu button is hidden', () => {
        cy.get('#menu #login').should('not.exist');
    })
    
    it('Register menu button is hidden', () => {
        cy.get('#menu #register').should('not.exist');
    })
    
    it('Logout menu button is visible', () => {
        cy.get('#menu #logout').should('exist');
    })

    it('Create blog menu button is visible', () => {
        cy.get('#menu #create').should('exist');
    })
})