const prompt = (state, action) => {
    switch (action.type) {

        // PUSH POSITIVE NOTIFICATION
        case 'show': {
            return action.payload
        }

        // HIDE & RESET PROMPT
        case 'hide': {
            return null
        }

        // FALLBACK
        default: {
            console.log('PROMPT REDUCER ERROR.')
            return state
        }
    }
}

export default prompt