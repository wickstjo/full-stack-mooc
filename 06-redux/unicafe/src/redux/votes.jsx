import { createStore } from 'redux'

// INIT STATE
const init_state = {
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
}

// ACTION REDUCER
const reducer = (state=init_state, action) => {
    switch (action.type) {

        // INCREMENT GOOD
        case 'good': {
            return {
                ...state,
                good: state.good + 1,
                total: state.total + 1
            }
        }

        // INCREMENT NEUTRAL
        case 'neutral': {
            return {
                ...state,
                neutral: state.neutral + 1,
                total: state.total + 1
            }
        }

        // INCREMENT BAD
        case 'bad': {
            return {
                ...state,
                bad: state.bad + 1,
                total: state.total + 1
            }
        }

        // RESET STATE TO ITS ORIGIN
        case 'reset': {
            return init_state
        }

        // FALLBACK -- DO NOTHING
        default: {
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