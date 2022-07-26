import { createSlice } from '@reduxjs/toolkit'

// INIT STATE
const init_state = [
    {
        id: 'bce2de80-0c38-11ed-b768-25c37bc206e7',
        text: 'foo',
        author: 'bar',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        votes: 0
    },
    {
        id: 'bf896d72-0c38-11ed-8870-f53aaa2a23ee',
        text: 'bar',
        author: 'biz',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        votes: 0
    }
]

// STATE ACTIONS
const actions = {

    // LOAD IN DATASET FROM DB
    load (state, action) {
        return action.dataset
    },

    // CREATE NEW ANECDOTE
    create (state, action) {
        state.push(action.anecdote)
    },

    // VOTE FOR ANECDOTE
    vote (state, action) {
        const target = state.findIndex(item => String(item.id) === action.id)
        state[target].votes += 1
    }
}

// EXPORT SLICE REDUER
export default createSlice({
    name: 'anecdotes',
    initialState: init_state,
    reducers: actions,
}).reducer