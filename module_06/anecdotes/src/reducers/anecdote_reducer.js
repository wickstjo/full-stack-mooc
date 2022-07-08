import { createStore } from 'redux'

// INIT STATE
const init_state = [
    {
        text: 'If it hurts, do it more often',
        votes: 0
    },{
        text: 'Adding manpower to a late software project makes it later!',
        votes: 0
    },{
        text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        votes: 0
    },{
        text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        votes: 0
    },{
        text: 'Premature optimization is the root of all evil.',
        votes: 0
    },{
        text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        votes: 0
    },{
        text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
        votes: 0
    }
]

// ACTION REDUCER
const reducer = (state=init_state, action) => {
    switch (action.type) {

        // CREATE NEW ANECDOTE
        case 'create': {
            return [
                ...state, {
                    text: action.anecdote,
                    votes: 0
                }
            ]
        }

        // VOTE FOR ANECDOTE
        case 'vote': {

            // TAKE SNAPSHOT & MODIFY
            const temp = [...state]
            temp[action.id].votes += 1

            return temp
        }

        // RESET STATE TO ITS ORIGIN
        case 'reset': {
            return init_state
        }

        // FALLBACK -- UNKNOWN ACTION
        default: {
            // console.log(`REDUCER ERROR, NO SUCH ACTION (${ action.type })`)
            return state
        }
    }

}

// CREATE REDUX STORE
const store = createStore(reducer)

export {
    init_state,
    reducer,
    store
}