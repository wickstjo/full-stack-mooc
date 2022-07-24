import { populate_object } from "./helper_funcs";

// NUMBER OF BLOGS TO CREATE
const n_blogs = 3;

describe('Blog creation', () => {

    // FIRST, REGISTER AND LOGIN USER
    before(() => {
        cy.init()
        cy.register_and_login()
    })

    it('There are no blogs by default', () => {
        cy.get('.blog_wrapper').should('not.exist')
    })

    it(`Creating ${ n_blogs } blog entries works correctly`, () => {
        for (let x=0; x<n_blogs; x++) {

            // CREATE BLOG & OPEN ITS DETAILS
            cy.create_blog()
            cy.get('.blog_wrapper #header').eq(x).click()
        }
    })
})

describe('Liking blogs', () => {

    it('Liking each blog once works correctly', () => {
        for (let x=0; x<n_blogs; x++) {
            cy.like_blog(x, 1)
        }
    })

    it('Disliking each blog once works correctly', () => {
        for (let x=0; x<n_blogs; x++) {
            cy.dislike_blog(0, 0)
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
})

describe('Blog owner can', () => {
    it('Remove existing blog entries', () => {
        for (let x=0; x<(n_blogs-1); x++) {

            // REMOVE THE BLOG & CHECK NOTIFICATION
            cy.get('.blog_wrapper #actions #remove').eq(0).click()
            cy.get('#notifications .item:last').should('contain', 'The blog was successfully removed')
        }

        // VERIY THAT EVERYTHING WAS REMOVED
        cy.get('.blog_wrapper').should('have.length', 1)
    })

    it('Update existing blog entry', () => {
        cy.get('.blog_wrapper #actions #update').click()

        // GENERATE NEW BLOG DETAILS
        const modified = populate_object([
            'title',
            'author',
            'url'
        ], 15)
        
        cy.get('#prompt #title').clear().type(modified.title)
        cy.get('#prompt #author').clear().type(modified.author)
        cy.get('#prompt #url').clear().type(modified.url)
        cy.get('#prompt #submit').click()

        cy.get('.blog_wrapper #header').should('contain', modified.title)
        cy.get('.blog_wrapper #blog #author').should('contain', modified.author)
        cy.get('.blog_wrapper #blog #url').should('contain', modified.url)

        cy.get('#notifications .item:last').should('contain', 'Blog successfully updated')
    })
})

describe('For other users', () => {
    before(() => {
        cy.logout()
        cy.register_and_login()
    })

    it('The remove blog button is hidden', () => {
        cy.get('.blog_wrapper #actions #remove').should('not.exist')
    })

    it('The update blog button is hidden', () => {
        cy.get('.blog_wrapper #actions #update').should('not.exist')
    })

    it('The like button is visible', () => {
        cy.get('.blog_wrapper #actions #like').should('exist')
    })

    it('Can like the remaining blog', () => {
        cy.like_blog(0, 2)
    })

    it('The dislike button is visible', () => {
        cy.get('.blog_wrapper #actions #dislike').should('exist')
    })

    it('Can dislike the remaining blog', () => {
        cy.dislike_blog(0, 1)
    })
})