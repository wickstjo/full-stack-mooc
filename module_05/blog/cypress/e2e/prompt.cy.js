describe('Login prompt', () => {
    
    before(() => {
        cy.init()
    })

    it('Triggers from correct menu item', () => {
        cy.get('#menu #login').click()
        cy.get('#prompt').should('exist')

        cy.get('#prompt #header').should('contain', 'login user')
        cy.get('#prompt #close').should('exist')
    })

    it('Has the correct fields', () => {
        cy.get('#prompt form input').should('have.length', 3)
        cy.get('#prompt #username').should('exist')
        cy.get('#prompt #password').should('exist')
        cy.get('#prompt #submit').should('exist')
    })

    it('Button is disabled by default', () => {
        cy.get('#prompt #submit').should('be.disabled')
    })

    it('Populating all fields enables button', () => {
        cy.get('#prompt #username').type('foo')
        cy.get('#prompt #password').type('foo')
        cy.get('#prompt #submit').should('not.be.disabled')
    })
})

describe('Register prompt', () => {
    
    before(() => {
        cy.init()
    })

    it('Triggers from correct menu item', () => {
        cy.get('#menu #register').click()
        cy.get('#prompt').should('exist')

        cy.get('#prompt #header').should('contain', 'register user')
        cy.get('#prompt #close').should('exist')
    })

    it('Has the correct fields', () => {
        cy.get('#prompt form input').should('have.length', 4)

        cy.get('#prompt #username').should('exist')
        cy.get('#prompt #name').should('exist')
        cy.get('#prompt #password').should('exist')

        cy.get('#prompt #submit').should('exist')
    })

    it('Button is disabled by default', () => {
        cy.get('#prompt #submit').should('be.disabled')
    })

    it('Populating all fields enables button', () => {
        cy.get('#prompt #username').type('foo')
        cy.get('#prompt #name').type('foo')
        cy.get('#prompt #password').type('foo')
        cy.get('#prompt #submit').should('not.be.disabled')
    })

    it('Button remains enabled without name field', () => {
        cy.get('#prompt #name').clear()
        cy.get('#prompt #submit').should('not.be.disabled')
    })
})

describe('Create blog prompt', () => {
    
    before(() => {
        cy.init()
        cy.register_and_login()
    })

    it('Triggers from correct menu item', () => {
        cy.get('#menu #create').click()
        cy.get('#prompt').should('exist')

        cy.get('#prompt #header').should('contain', 'create blog')
        cy.get('#prompt #close').should('exist')
    })

    it('Has the correct fields', () => {
        cy.get('#prompt form input').should('have.length', 4)
        cy.get('#prompt #title').should('exist')
        cy.get('#prompt #author').should('exist')
        cy.get('#prompt #url').should('exist')
        cy.get('#prompt #submit').should('exist')
    })

    it('Button is disabled by default', () => {
        cy.get('#prompt #submit').should('be.disabled')
    })

    it('Populating all fields enables button', () => {
        cy.get('#prompt #title').type('foo')
        cy.get('#prompt #author').type('foo')
        cy.get('#prompt #url').type('foo')
        cy.get('#prompt #submit').should('not.be.disabled')
    })
})

describe('Update blog prompt', () => {
    
    before(() => {
        cy.init()
        cy.register_and_login()
        cy.create_blog()
    })

    it('Triggers from correct blog action', () => {
        cy.get('.blog_wrapper #header').should('exist')
        cy.get('.blog_wrapper #header').click()
        
        cy.get('.blog_wrapper #actions #update').should('exist')
        cy.get('.blog_wrapper #actions #update').click()

        cy.get('#prompt #header').should('contain', 'update blog')
        cy.get('#prompt #close').should('exist')
    })

    it('Has the correct fields', () => {
        cy.get('#prompt form input').should('have.length', 4)
        cy.get('#prompt #title').should('exist')
        cy.get('#prompt #author').should('exist')
        cy.get('#prompt #url').should('exist')
        cy.get('#prompt #submit').should('exist')
    })

    it('Fields are populated', () => {
        cy.get('#prompt #title').invoke('val').should('not.be.empty')
        cy.get('#prompt #author').invoke('val').should('not.be.empty')
        cy.get('#prompt #url').invoke('val').should('not.be.empty')
    })

    it('The submit button is enabled', () => {
        cy.get('#prompt #submit').should('not.be.disabled')
    })
})