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
            resource: actions.resource,
            service: actions.service,
        }
    },

    update_author (state, actions) {
        return {
            window: 'update_book',
            resource: actions.resource,
            service: actions.service,
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