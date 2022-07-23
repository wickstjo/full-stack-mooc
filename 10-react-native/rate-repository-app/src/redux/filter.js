import { createSlice } from '@reduxjs/toolkit'

// INIT STATE
const init_state = {
    tag: 'latest',
    keyword: ''
}

// STATE ACTIONS
const actions = {
    update_tag (state, actions) {
        state.tag = actions.tag
    },

    update_keyword (state, actions) {
        state.keyword = actions.keyword
    },
}

// EXPORT SLICE REDUER
export default createSlice({
    name: 'filter',
    initialState: init_state,
    reducers: actions,
}).reducer