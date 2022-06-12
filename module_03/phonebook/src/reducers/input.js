// INPUT REDUCER
const input = (state, action) => {
    switch (action.type) {

        // UPDATE TARGET STATE
        case 'update': { return {
            ...state,
            [action.target]: action.payload
        }}

        // RESET NON-FILTER STATES
        case 'reset': { return {
            ...state,
            name: '',
            number: ''
        }}

        // FALLBACK
        default: {
            console.log('INPUT REDUCER ERROR.');
            return state;
        }
    }
}

export default input;