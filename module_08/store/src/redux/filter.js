import { createSlice } from '@reduxjs/toolkit'

// AUXILLARY
const init_state = ''

// STATE ACTIONS
const actions = {

    // CREATE POSITIVE NOTIFICATION
    update (state, action) {
        return action.keyword
    },
}

// EXPORT SLICE REDUER
export default createSlice({
    name: 'filter',
    initialState: init_state,
    reducers: actions,
}).reducer