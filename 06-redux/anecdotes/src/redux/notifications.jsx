import { createSlice } from '@reduxjs/toolkit'
import { v1 as uuid } from 'uuid'

// AUXILLARY
const init_state = []
const default_duration = 5000

const check = (state, action, type) => {

    // RECEIVED ARRAY OF MESSAGES
    if (action.message instanceof Array) {
        action.message.map(message =>
            state.push({
                message,
                kind: type,
                duration: action.duration ? action.duration : default_duration,
                id: uuid()
            })
        )

    // RECEIVED SOLO MESSAGE
    } else {
        state.push({
            message: action.message,
            kind: type,
            duration: action.duration ? action.duration : default_duration,
            id: uuid()
        })
    }
}

// STATE ACTIONS
const actions = {

    // CREATE POSITIVE NOTIFICATION
    positive (state, action) {
        check(state, action, 'positive')
    },

    // CREATE NEGATIVE NOTIFICATION
    negative (state, action) {
        check(state, action, 'negative')
    },

    // REMOVE NOTIFICATION
    remove (state, action) {
        return state.filter(item => item.id !== action.id)
    }
}

// EXPORT SLICE REDUER
const reducer = createSlice({
    name: 'notifications',
    initialState: init_state,
    reducers: actions,
}).reducer

export {
    reducer
}