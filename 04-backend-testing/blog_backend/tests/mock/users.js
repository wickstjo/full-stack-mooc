module.exports = {

    // FULLY FUNCTIONAL USER
    proper: {
        username: 'foofoo',
        name: 'barbar',
        password: 'bizbizbiz'
    },

    // FUNCTIONAL WITHOUT NAME
    nameless: {
        username: 'foofoo',
        password: 'bizbizbiz'
    },

    // TOO SHORT USERNAME
    short_username: {
        username: 'f',
        name: 'barbar',
        password: 'bizbizbiz'
    },

    // TOO SHORT PASSWORD
    short_password: {
        username: 'foofoo',
        name: 'barbar',
        password: 'f'
    },
    
    // TOO SHORT NAME
    short_name: {
        username: 'foofoo',
        name: 'f',
        password: 'bizbizbiz'
    },

    // NO USERNAME
    no_username: {
        name: 'barbar',
        password: 'bizbizbiz'
    },

    // NO PASSWORD
    no_password: {
        username: 'foofoo',
        name: 'barbar',
    }
}