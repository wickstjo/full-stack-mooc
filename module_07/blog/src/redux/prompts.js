import { createSlice } from '@reduxjs/toolkit'

// INIT STATE
const init_state = null

// STATE ACTIONS
const actions = {

    // CREATE BLOG PROMPT
    create () {
        return {
            window: 'create',
        }
    },

    // UPDATE BLOG PROMPT
    update (state, actions) {
        return {
            window: 'update',
            resource: actions.resource,
            service: actions.service,
        }
    },

    // LEAVE BLOG COMMENT
    comment (state, actions) {
        return {
            window: 'comment',
            service: actions.service,
        }
    },

    // LOGIN PROMPT
    login () {
        return {
            window: 'login'
        }
    },

    // REGISTER PROMPT
    register () {
        return {
            window: 'register'
        }
    },

    // HIDE PROMPT
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