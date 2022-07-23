import { createSlice } from '@reduxjs/toolkit'

// DEFAULT STATE
const init_state = {
    books: [],
    authors: [],
    users: [],
    loading: true
}

// STATE ACTIONS
const actions = {

    // INITIALIZE
    init (state, action) {
        return {
            ...action,
            loading: false
        }
    },

    // ADD BOOK
    add_book (state, action) {
        state.books.push(action.book)
    },

    // UPDATE BOOK
    upd_book (state, action) {

        // FIND INDEX
        const target = state.books.findIndex(book => book.id === action.book.id)
        
        // UPDATE BOOK IN STATE
        if (target !== -1) {
            state.books[target] = action.book

        // CATCH CACHE MISSES & PUSH INSTEAD
        } else {
            console.log('BOOK UPDATE CACHE MISS')
            state.books.push(action.book)
        }
    },

    // ADD AUTHOR
    add_author (state, action) {
        state.authors.push(action.author)
    },

    // UPDATE AUTHOR
    upd_author (state, action) {
        
        // FIND INDEX
        const target = state.authors.findIndex(author => author.id === action.author.id)
        
        // UPDATE BOOK IN STATE
        if (target !== -1) {
            state.authors[target] = action.author

        // CATCH CACHE MISSES & PUSH INSTEAD
        } else {
            console.log('AUTHOR UPDATE CACHE MISS')
            state.authors.push(action.author)
        }
    },

    // ADD USER
    add_user (state, action) {
        state.users.push(action.user)
    },

    // UPDATE AUTHOR
    upd_user (state, action) {
        
        // FIND INDEX
        const target = state.users.findIndex(user => user.id === action.user.id)
        
        // UPDATE BOOK IN STATE
        if (target !== -1) {
            state.users[target] = action.user

        // CATCH CACHE MISSES & PUSH INSTEAD
        } else {
            console.log('USER UPDATE CACHE MISS')
            state.users.push(action.user)
        }
    },
}

// EXPORT SLICE REDUER
export default createSlice({
    name: 'data',
    initialState: init_state,
    reducers: actions,
}).reducer