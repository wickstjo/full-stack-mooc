import { populate_object } from './helper_funcs'

describe('Baseline page', () => {
    
    // FIRST, INITIALIZE
    before(() => {
        cy.init()
    })

    it('There are no blogs by default', () => {
        cy.get('.blog_wrapper').should('not.exist')
    })

    it('The create blog menu item does not exist without a user session', () => {
        cy.get('.blog_wrapper').should('not.exist')
    })
})

describe('Create blog prompt', () => {
    
    // FIRST, REGISTER AND LOGIN USER
    before(() => {
        cy.register_and_login()
    })

    it('Create blog menu item exists with user session', () => {
        cy.get('#menu #create').should('exist')
    })

    it('Clicking it opens the prompt', () => {
        cy.get('#prompt').should('not.exist')
        cy.get('#menu #create').click()
        cy.get('#prompt').should('exist')
    })

    it('Prompt has correct selectors', () => {
        cy.get('#prompt #header').should('contain', 'create blog');
        cy.get('#prompt #title').should('exist');
        cy.get('#prompt #author').should('exist');
        cy.get('#prompt #url').should('exist');
    })

    it('Prompt button is diabled by default', () => {
        cy.get('#prompt #submit').should('be.disabled')
    })
})

describe('Blog actions', () => {

    // NUMBER OF BLOGS TO CREATE
    const n_blogs = 3;

    // FIRST, REGISTER AND LOGIN USER
    before(() => {
        cy.register_and_login()
    })

    it(`Creating ${ n_blogs } blog entries works correctly`, () => {
        for (let x=0; x<n_blogs; x++) {

            // CREATE BLOG & OPEN ITS DETAILS
            cy.create_blog()
            cy.get('.blog_wrapper #header').eq(x).click()
        }
    })

    it('Liking each blog once works correctly', () => {
        for (let x=0; x<n_blogs; x++) {
            cy.like_blog(x)
        }
    })

    it('Disliking each blog once works correctly', () => {
        for (let x=0; x<n_blogs; x++) {
            cy.dislike_blog(0)
        }
    })

    it('Blogs are sorted by likes in descending order', () => {

        // LIKE BLOGS AN INCREASING AMOUNT OF TIME IN A SEQUENTIAL ORDER
        for (let x=0; x<n_blogs; x++) {

            // SELECT THE CURRENTLY LAST LISTED BLOG
            cy.get('.blog_wrapper #actions #like').eq(n_blogs-1).as('theButton')

            // HOW MANY TIMES TO CLICK LIKE BUTTON
            const limit = x+1
        
            // CLICK ITS LIKE BUTTON Y TIMES
            for (let y=0; y<limit; y++) {
                cy.get('@theButton').click()
            }

            // MAKE SURE ITS NOW LISTED FIRST
            cy.get('.blog_wrapper #blog #likes').eq(0).should('contain', limit)
        }

        // VERIFY DESCENDING ORDER
        for (let x=0; x<n_blogs; x++) {
            cy.get('.blog_wrapper #blog #likes').eq(x).should('contain', (n_blogs-x))
        }
    })

    it('Removing blogs work correctly', () => {
        for (let x=0; x<n_blogs; x++) {

            // REMOVE THE BLOG & CHECK NOTIFICATION
            cy.get('.blog_wrapper #actions #remove').eq(0).click()
            cy.get('#notifications .item:last').should('contain', 'The blog was successfully removed')
        }

        // VERIY THAT EVERYTHING WAS REMOVED
        cy.get('.blog_wrapper').should('not.exist')
    })
})