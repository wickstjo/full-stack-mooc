import { createSlice } from '@reduxjs/toolkit'

// AUXILLARY
const init_state = []
const default_duration = 5000;

// STATE ACTIONS
const actions = {

    // CREATE POSITIVE NOTIFICATION
    positive (state, action) {
        state.push({
            message: action.message,
            kind: 'positive',
            duration: action.duration ? action.duration : default_duration,
            id: Number((Math.random() * 100000000).toFixed(0))
        })
    },

    // CREATE NEGATIVE NOTIFICATION
    negative (state, action) {
        state.push({
            message: action.message,
            kind: 'negative',
            duration: action.duration ? action.duration : default_duration,
            id: Number((Math.random() * 100000000).toFixed(0))
        })
    },

    // CREATE NEUTRAL NOTIFICATION
    neutral (state, action) {
        state.push({
            message: action.message,
            kind: 'neutral',
            duration: action.duration ? action.duration : default_duration,
            id: Number((Math.random() * 100000000).toFixed(0))
        })
    },

    // REMOVE NOTIFICATION
    remove (state, action) {
        return state.filter(item => item.id !== action.id)
    }
}

// EXPORT SLICE REDUER
export default createSlice({
    name: 'notifications',
    initialState: init_state,
    reducers: actions,
}).reducer