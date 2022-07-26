import { createSlice } from '@reduxjs/toolkit'

// INIT STATE
const init_state = {
    session: false,
    username: undefined,
    token: undefined,
    header: {},
}

// CREATE AUTH HEADER
const create_header = (data) => {
    return {
        headers: {
            authorization: `Bearer ${ data.token }`
        }
    }
}

// STATE ACTIONS
const actions = {

    // START SESSION
    login (state, action) {
        return {
            ...action.credentials,
            header: create_header(action.credentials),
            session: true,
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