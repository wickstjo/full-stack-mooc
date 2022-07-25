import { createSlice } from '@reduxjs/toolkit'

// INIT STATE
const init_state = ''

const actions = {
    update (state, action) {
        return action.keyword
    }
}

const reducer = createSlice({
    name: 'filter',
    initialState: init_state,
    reducers: actions,
}).reducer

export {
    reducer,
}