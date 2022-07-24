import { populate_object } from './/helper_funcs'

describe('Authentication', () => {
    
    before(() => {
        cy.init()
    })

    // GENERATE TEST USER
    const test_user = populate_object([
        'username',
        'name',
        'password'
    ], 15)

    it('Login fails correctly for non-registered user', () => {
        cy.login(test_user)

        // CHECK NOTIFICATIONS & CLOSE THE PROMPT
        cy.notification('Username and password combination does not exist.')
        cy.get('#prompt #close').click()
    })
    
    it('Registering with all params succeeds correctly', () => {
        cy.register_and_login(test_user)
    })
    
    it('Logging out works correctly', () => {
        cy.logout()
    })

    it('Registering the same user fails due to username uniqueness', () => {
        cy.register(test_user)
        cy.notification('The username is not unique')
        cy.get('#prompt #close').click()
    })

    it('Login succeeds correctly for registed user', () => {
        cy.login(test_user)
        cy.notification('Successfully logged in')
    })
})