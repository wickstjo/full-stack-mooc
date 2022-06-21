import { page_url, db_reset_url, populate_object } from '../e2e/helper_funcs'

Cypress.Commands.add('init', () => {
    cy.request('GET', db_reset_url)
    cy.visit(page_url)
})

// REGISTER NEW USER & AUTO LOGIN
Cypress.Commands.add('register_and_login', () => {

    // TOGO PAGE AND EXPECT BLOGS TO BE FETCHED
    cy.visit(page_url)
    cy.notification('Blogs fetched successfully.')
    
    // OPEN REGISTER PROMPT
    cy.get('#menu #register').click()

    // GENERATE CREDENTIALS
    const user = populate_object([
        'username',
        'password'
    ], 15)

    // TYPE IN CREDENTIALS & GO
    cy.get('#prompt #username').type(user.username)
    cy.get('#prompt #password').type(user.password)
    cy.get('#prompt #submit').click()

    // CHECK NOTIFICATIONS
    cy.notification('User successfully created!')
    cy.notification('User successfully logged in!')
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
    cy.get('#prompt #title').type(blog.title)
    cy.get('#prompt #author').type(blog.author)
    cy.get('#prompt #url').type(blog.url)
    cy.get('#prompt #submit').click()
    
    // MAKE SURE THE BLOG EXISTS, THEN THE PROMPT VISIBILITY
    cy.get('.blog_wrapper #header:last').should('contain', blog.title)
    cy.get('#prompt').should('not.exist');
    
    // CHECK NOTIFICATIONS
    cy.notification('The blog was successfully created')
})

Cypress.Commands.add('like_blog', (index) => {

    // ANCHOR SELECTORS
    cy.get('.blog_wrapper #actions #like').eq(index).as('button')
    cy.get('.blog_wrapper #blog #likes').eq(index).as('container')

    // CLICK THE LIKE BUTTON & READ THE NEW LIKES STATE
    cy.get('@button').click()
    cy.get('@container').should('contain', 1)

    // CHECK NOTIFICATION
    cy.notification('Blog liked')
})

Cypress.Commands.add('dislike_blog', (index) => {

    // ANCHOR SELECTORS
    cy.get('.blog_wrapper #actions #dislike').eq(index).as('button')
    cy.get('.blog_wrapper #blog #likes').eq(index).as('container')

    // CLICK THE LIKE BUTTON & READ THE NEW LIKES STATE
    cy.get('@button').click()
    cy.get('@container').should('contain', 0)

    // CHECK NOTIFICATION
    cy.notification('Blog disliked')
})

Cypress.Commands.add('notification', (text) => {
    cy.get('#notifications .item:last').should('contain', text)
})