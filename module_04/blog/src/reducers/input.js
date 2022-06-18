// INPUT REDUCER
const input = (state, action) => {
    switch (action.type) {

        // UPDATE TARGET STATE
        case 'update': { return {
            ...state,
            [action.target]: action.payload
        }}

        // RESET KEYSTATES
        case 'reset': {
            const temp = { ...state }

            // RESET EACH KEY VALUE
            Object.keys(temp).forEach(key => {
                temp[key] = ''
            })

            return temp
        }

        // FALLBACK
        default: {
            console.log('INPUT REDUCER ERROR.')
            return state
        }
    }
}

export default input