import { createSlice } from '@reduxjs/toolkit'

// INIT STATE
const init_state = {
    blogs: []
}

// STATE ACTIONS
const actions = {

    overwrite (state, action) {
        state[action.resource] = action.payload
    },

    create (state, action) {
        state[action.resource].push(action.entry)
    },

    remove (state, action) {
        state[action.resource] = state[action.resource].filter(entry => entry.id !== action.id)
    },

    update (state, action) {
        const target = state[action.resource].findIndex(entry => entry.id === action.entry.id)

        // MERGE OLD AND NEW VALUES
        state[action.resource][target] = {
            ...state[action.resource][target],
            ...action.entry
        }
    }
}

// EXPORT SLICE REDUER
export default createSlice({
    name: 'resources',
    initialState: init_state,
    reducers: actions,
}).reducer