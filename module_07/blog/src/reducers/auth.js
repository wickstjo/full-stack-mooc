import { createSlice } from '@reduxjs/toolkit'

// INIT STATE
const init_state = {
    session: false,
    username: undefined,
    token: undefined
}

// STATE ACTIONS
const actions = {

    // CREATE SESSION
    create (state, action) {
        return {
            ...action.credentials,
            session: true
        }
    },

    // TERMINATE SESSION
    logout () {
        return init_state
    },
}

// EXPORT SLICE REDUER
export default createSlice({
    name: 'auth',
    initialState: init_state,
    reducers: actions,
}).reducer