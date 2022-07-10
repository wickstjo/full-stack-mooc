import { createSlice } from '@reduxjs/toolkit'

// INIT STATE
const init_state = {
    session: false,
    username: undefined,
    token: undefined
}

// LOCALSTORAGE KEY
const storage_key = 'ASDFASD'

// STATE ACTIONS
const actions = {

    // CHECK LOCALSTORAGE
    check (state) {

        // CHECK STORAGE CONTENT
        const content = localStorage.getItem(storage_key)

        // IF SOMETHING WAS FOUND
        if (content) {
            return {
                ...JSON.parse(content),
                session: true
            }
        }

        return state
    },

    // START SESSION
    login (state, action) {

        // SAVE CREDENTIALS IN LOCALSTORAGE
        const stringified = JSON.stringify(action.credentials)
        localStorage.setItem(storage_key, stringified)

        return {
            ...action.credentials,
            session: true
        }
    },

    // TERMINATE SESSION
    logout () {
        localStorage.clear()
        return init_state
    },
}

// EXPORT SLICE REDUER
export default createSlice({
    name: 'auth',
    initialState: init_state,
    reducers: actions,
}).reducer