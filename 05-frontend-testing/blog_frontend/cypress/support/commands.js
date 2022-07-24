import { page_url, db_reset_url, populate_object } from '../e2e/helper_funcs'

Cypress.Commands.add('init', () => {
    cy.request('GET', db_reset_url)
    cy.visit(page_url)
})

// REGISTER NEW USER
Cypress.Commands.add('register', (user) => {
    
    // OPEN REGISTER PROMPT
    cy.get('#menu #register').click()

    // TYPE IN CREDENTIALS & GO
    cy.get('#register_username').type(user.username)
    cy.get('#register_password').type(user.password)
    cy.get('#trigger').click()
})

// REGISTER NEW USER & AUTO LOGIN
Cypress.Commands.add('login', (user) => {

    // OPEN REGISTER PROMPT
    cy.get('#menu #login').click()
        
    // TYPE IN CREDENTIALS
    cy.get('#login_username').type(user.username)
    cy.get('#login_password').type(user.password)
    cy.get('#trigger').click()
})

Cypress.Commands.add('logout', () => {
    cy.get('#menu #logout').click()
    cy.notification('Successfully logged out')
})

// FULL REGISTER SUITE SHORTHAND
Cypress.Commands.add('register_and_login', (provided_user=false) => {
    let user = provided_user

    // GENERATE USER CREDENTIALS WHEN NONE WERE PROVIDED
    if (!provided_user) {
        user = populate_object([
            'username',
            'password'
        ], 15)
    }
    
    // ATTEMPT TO REGISTER USER
    cy.register(user)

    // CHECK NOTIFICATIONS
    cy.notification('Successfully registered')
    cy.notification('Successfully logged in')
})

Cypress.Commands.add('create_blog', () => {
    cy.get('#menu #create').click()

    // GENERATE BLOG
    const blog = populate_object([
        'title',
        'author',
        'url'
    ], 15)
    
    // FILL IN CREDENTIALS & SUBMIT
    cy.get('#create_title').type(blog.title)
    cy.get('#create_author').type(blog.author)
    cy.get('#create_url').type(blog.url)
    cy.get('#trigger').click()
    
    // MAKE SURE THE BLOG EXISTS, THEN THE PROMPT VISIBILITY
    cy.get('#container #wrapper #header:last').should('contain', blog.title)
    cy.get('#prompt').should('not.exist');
    
    // CHECK NOTIFICATIONS
    cy.notification('Entry successfully added')
})

Cypress.Commands.add('like_blog', (index, value) => {

    // ANCHOR SELECTORS
    cy.get('#wrapper #actions #like').eq(index).as('button')
    cy.get('#wrapper #content #likes').eq(index).as('container')

    // CLICK THE LIKE BUTTON & READ THE NEW LIKES STATE
    cy.get('@button').click()
    cy.get('@container').should('contain', value)

    // CHECK NOTIFICATION
    cy.notification('Liked entry')
})

Cypress.Commands.add('dislike_blog', (index, value) => {

    // ANCHOR SELECTORS
    cy.get('#wrapper #actions #dislike').eq(index).as('button')
    cy.get('#wrapper #content #likes').eq(index).as('container')

    // CLICK THE LIKE BUTTON & READ THE NEW LIKES STATE
    cy.get('@button').click()
    cy.get('@container').should('contain', value)

    // CHECK NOTIFICATION
    cy.notification('Disliked entry')
})

Cypress.Commands.add('notification', (text) => {
    cy.get('#notifications .item').should('contain', text)
})