describe('Baseline', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('Login menu button is visible by default', () => {
        cy.get('#menu #login').should('exist');
    })

    it('Clicking the login menu button opens the login prompt', () => {
        cy.get('#menu #login').click()
        cy.get('#prompt').should('exist');
    })

    it('Logout menu button is invisible by default', () => {
        cy.get('#menu #logout').should('not.exist');
    })

    it('Blog actions are hidden for non-logged users', () => {
        cy.get('.blog_wrapper #actions').should('not.exist');
    })
})

describe('Login prompt', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('#menu #login').click()
    })

    it('Login prompt has correct selectors', () => {

        cy.get('#prompt #header').should('contain', 'login user');
        cy.get('#prompt #username').should('exist');
        cy.get('#prompt #password').should('exist');
        cy.get('#prompt #submit').should('exist');
    })

    it('Login prompt button is disabled by default', () => {
        cy.get('#prompt #submit').should('be.disabled')
    })
})

describe('Valid login', () => {

    // VALID CREDENTIALS
    const credentials = {
        username: 'foo',
        password: 'bar'
    }

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('#menu #login').click()

        // FILL IN CREDENTIALS & SUBMIT
        cy.get('#prompt #username').type(credentials.username)
        cy.get('#prompt #password').type(credentials.password)
        cy.get('#prompt #submit').click()
    })

    it('Triggers positive notification correctly', () => {
        cy.get('#notifications #positive').should('contain', 'User successfully logged in!')
    })

    it('Hides the prompt correctly', () => {

        // MAKE SURE PROMPT IS NOW HIDDEN
        cy.get('#prompt').should('not.exist');
    })

    it('Updates main menu correctly', () => {

        // OLD ITEMS ARE HIDDEN
        cy.get('#menu #login').should('not.exist');
        cy.get('#menu #register').should('not.exist');

        // NEW ITEMS ARE VISIBLE
        cy.get('#menu #create').should('exist');
        cy.get('#menu #logout').should('exist');
    })

    it('Blog actions become visible', () => {
        cy.get('.blog_wrapper #actions').should('exist');
    })
})

describe('Invalid login', () => {

    // INVALID CREDENTIALS
    const credentials = {
        username: 'a54645645234523423423234',
        password: 'sdfsd53sdf'
    }

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('#menu #login').click()

        // FILL IN CREDENTIALS & SUBMIT
        cy.get('#prompt #username').type(credentials.username)
        cy.get('#prompt #password').type(credentials.password)
        cy.get('#prompt #submit').click()
    })

    it('Triggers negative notifications correctly', () => {
        cy.get('#notifications #negative').should('contain', 'Could not log you in (401)')
        cy.get('#notifications #negative').should('contain', 'Username and password combination does not exist.')
    })

    it('Prompt remains visible', () => {
        cy.get('#prompt').should('exist')
    })

    it('Field values persist correctly', () => {
        cy.get('#prompt #username').should('have.value', credentials.username)
        cy.get('#prompt #password').should('have.value', credentials.password)
    })
})