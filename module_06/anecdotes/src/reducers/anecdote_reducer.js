import { createSlice } from '@reduxjs/toolkit'

// INIT STATE
const init_state = [
    {
        text: 'If it hurts, do it more often',
        votes: 0,
        id: 65471789
    },
    {
        text: 'Premature optimization is the root of all evil.',
        votes: 0,
        id: 6897019
    },
    {
        text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
        votes: 0,
        id: 32540446
    }
]

// STATE ACTIONS
const actions = {

    // CREATE NEW ANECDOTE
    create (state, action) {
        state.push({
            text: action.anecdote,
            votes: 0,
            id: Number((Math.random() * 100000000).toFixed(0))
        })
    },

    // VOTE FOR ANECDOTE
    vote (state, action) {
        const target = state.findIndex(item => item.id === action.id)
        state[target].votes += 1
    }
}

// EXPORT SLICE REDUER
export default createSlice({
    name: 'anecdotes',
    initialState: init_state,
    reducers: actions,
}).reducer