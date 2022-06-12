// PSEUDO RANDOM ID GENERATOR
const pseudo_random = () => {
    return Date.now() * Math.random()
}

// NOTIFICATION REDUCER
const notifications = (state, action) => {
    switch (action.type) {

        // PUSH POSITIVE NOTIFICATION
        case 'positive': { return [
            ...state, {
                type: 'positive',
                message: action.message,
                id: pseudo_random()
            }
        ]}

        // PUSH NEGATIVE NOTIFICATION
        case 'negative': { return [
            ...state, {
                type: 'negative',
                message: action.message,
                id: pseudo_random()
            }
        ]}

        // FALLBACK
        default: {
            console.log('NOTIFICATION REDUCER ERROR.');
            return state;
        }
    }
}

export default notifications;