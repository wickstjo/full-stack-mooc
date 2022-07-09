import { createSlice } from '@reduxjs/toolkit'

// INIT STATE
const init_state = []

// STATE ACTIONS
const actions = {

    // CREATE NEW ANECDOTE
    create (state, action) {
        state.push({
            message: action.message,
            duration: action.duration,
            id: Number((Math.random() * 100000000).toFixed(0))
        })
    },
}

// EXPORT SLICE REDUER
export default createSlice({
    name: 'notifications',
    initialState: init_state,
    reducers: actions,
}).reducer