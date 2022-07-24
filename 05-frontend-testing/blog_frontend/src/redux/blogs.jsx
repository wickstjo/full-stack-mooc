import { createSlice } from '@reduxjs/toolkit'

// INIT STATE
const init_state = []

// STATE ACTIONS
const actions = {

    overwrite (state, action) {
        return action.payload
    },

    add (state, action) {
        state.push(action.blog)
    },

    remove (state, action) {
        return state.filter(entry => entry.id !== action.id)
    },

    update (state, action) {
        const target = state.findIndex(foo => foo.id === action.blog.id)

        // MERGE OLD AND NEW VALUES
        state[target] = {
            ...state[target],
            ...action.blog
        }
    }
}

// EXPORT SLICE REDUER
export default createSlice({
    name: 'blogs',
    initialState: init_state,
    reducers: actions,
}).reducer