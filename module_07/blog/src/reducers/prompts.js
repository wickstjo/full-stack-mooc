import { createSlice } from '@reduxjs/toolkit'

// INIT STATE
const init_state = null

// STATE ACTIONS
const actions = {

    // SHOW PROMPT
    show (state, action) {
        return action.payload
    },

    // HIDE PROMPT
    hide () {
        return null
    }
}

// EXPORT SLICE REDUER
export default createSlice({
    name: 'prompts',
    initialState: init_state,
    reducers: actions,
}).reducer