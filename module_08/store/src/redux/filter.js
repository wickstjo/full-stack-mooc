import { createSlice } from '@reduxjs/toolkit'

// INIT STATE
const init_state = {
    value: ''
}

// STATE ACTIONS
const actions = {

    // UPDATE ANECDOTE FILTER
    update (state, action) {
        state.value = action.keyword
    },
}

// EXPORT SLICE REDUER
export default createSlice({
    name: 'filter',
    initialState: init_state,
    reducers: actions,
}).reducer