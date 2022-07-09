import { createSlice } from '@reduxjs/toolkit'

// INIT STATE
const init_state = []

// STATE ACTIONS
const actions = {

    // CREATE NOTIFICATION
    create (state, action) {
        state.push({
            message: action.message,
            duration: action.duration,
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