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
        cy.get('#prompt #login_username').should('exist')
        cy.get('#prompt #login_password').should('exist')
        cy.get('#prompt #trigger').should('exist')
    })

    it('Button is disabled by default', () => {
        cy.get('#prompt #trigger').should('be.disabled')
    })

    it('Populating all fields enables button', () => {
        cy.get('#prompt #login_username').type('foo')
        cy.get('#prompt #login_password').type('foo')
        cy.get('#prompt #trigger').should('not.be.disabled')
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

        cy.get('#prompt #register_username').should('exist')
        cy.get('#prompt #register_name').should('exist')
        cy.get('#prompt #register_password').should('exist')

        cy.get('#prompt #trigger').should('exist')
    })

    it('Button is disabled by default', () => {
        cy.get('#prompt #trigger').should('be.disabled')
    })

    it('Populating all fields enables button', () => {
        cy.get('#prompt #register_username').type('foo')
        cy.get('#prompt #register_name').type('foo')
        cy.get('#prompt #register_password').type('foo')
        cy.get('#prompt #trigger').should('not.be.disabled')
    })

    it('Button remains enabled without name field', () => {
        cy.get('#prompt #register_name').clear()
        cy.get('#prompt #trigger').should('not.be.disabled')
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
        cy.get('#prompt form input').should('have.length', 5)
        cy.get('#prompt #create_title').should('exist')
        cy.get('#prompt #create_author').should('exist')
        cy.get('#prompt #create_url').should('exist')
        cy.get('#prompt #create_likes').should('exist')
        cy.get('#prompt #trigger').should('exist')
    })

    it('Button is disabled by default', () => {
        cy.get('#prompt #trigger').should('be.disabled')
    })

    it('Populating all fields except likes enables button', () => {
        cy.get('#prompt #create_title').type('foo')
        cy.get('#prompt #create_author').type('foo')
        cy.get('#prompt #create_url').type('foo')
        cy.get('#prompt #trigger').should('not.be.disabled')
    })
})

describe('Update blog prompt', () => {
    
    before(() => {
        cy.init()
        cy.register_and_login()
        cy.create_blog()
    })

    it('Triggers from correct blog action', () => {
        cy.get('#wrapper #header').should('exist')
        cy.get('#wrapper #header').click()
        
        cy.get('#wrapper #actions #update').should('exist')
        cy.get('#wrapper #actions #update').click()

        cy.get('#prompt #header').should('contain', 'update blog')
        cy.get('#prompt #close').should('exist')
    })

    it('Has the correct fields', () => {
        cy.get('#prompt form input').should('have.length', 4)
        cy.get('#prompt #update_title').should('exist')
        cy.get('#prompt #update_author').should('exist')
        cy.get('#prompt #update_url').should('exist')
        cy.get('#prompt #trigger').should('exist')
    })

    it('Fields are populated', () => {
        cy.get('#prompt #update_title').invoke('val').should('not.be.empty')
        cy.get('#prompt #update_author').invoke('val').should('not.be.empty')
        cy.get('#prompt #update_url').invoke('val').should('not.be.empty')
    })

    it('The submit button is enabled', () => {
        cy.get('#prompt #trigger').should('not.be.disabled')
    })
})