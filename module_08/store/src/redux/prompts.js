import { createSlice } from '@reduxjs/toolkit'

// INIT STATE
const init_state = null

// STATE ACTIONS
const actions = {

    create_book () {
        return {
            window: 'create_book',
        }
    },

    update_book (state, actions) {
        return {
            window: 'update_book',
            book: actions.book,
            id: actions.id,
        }
    },

    update_author (state, actions) {
        return {
            window: 'update_author',
            author: actions.author,
            id: actions.id,
        }
    },

    register (state, actions) {
        return {
            window: 'register',
        }
    },

    login (state, actions) {
        return {
            window: 'login',
        }
    },

    hide () {
        return null
    }
}

// EXPORT SLICE REDUER
export default createSlice({
    name: 'prompts',
    initialState: init_state,
    reducers: actions,
}).reducer