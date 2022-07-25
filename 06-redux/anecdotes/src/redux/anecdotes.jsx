import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// INIT STATE
const init_state = []

const actions = {
    overwrite (state, action) {
        return action.payload
    },

    create (state, action) {
        state.push(action.payload)
    },

    update (state, action) {
        const target = state.findIndex(item => item.id === action.payload.id)
        state[target] = action.payload
    }
}

const reducer = createSlice({
    name: 'anecdotes',
    initialState: init_state,
    reducers: actions,
}).reducer

const fetch_all = () => {
    return async dispatch => {
        const response = await axios.get('http://localhost:3001/anecdotes')

        dispatch({
            type: 'anecdotes/overwrite',
            payload: response.data
        })
    }
}

const create_one = (payload) => {
    return async dispatch => {
        const response = await axios.post('http://localhost:3001/anecdotes', payload)

        dispatch({
            type: 'anecdotes/create',
            payload: response.data
        })
    }
}

const vote_for = (payload) => {
    return async dispatch => {
        const response = await axios.put(`http://localhost:3001/anecdotes/${ payload.id }`, payload)

        dispatch({
            type: 'anecdotes/update',
            payload: response.data
        })
    }
}

export {
    reducer,
    fetch_all,
    create_one,
    vote_for,
}