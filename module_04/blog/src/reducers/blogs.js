const blogs = (state, action) => {
    switch (action.type) {

        // FULLY OVERWRITE EXISTING STATE
        case 'overwrite': {
            return action.payload
        }

        // ADD BLOG
        case 'add': { return [
            ...state,
            action.payload
        ]}

        // FILTER OUT BLOG BY ID
        case 'reduce': {
            return state.filter(entry => entry.id !== action.id)
        }

        // UPDATE EXISTING BLOG
        case 'update': {

            // FIND INDEX
            const temp = [...state]
            const target = temp.findIndex(foo => foo.id === action.id)

            // MERGE OLD AND NEW VALUES
            temp[target] = {
                ...temp[target],
                ...action.mods
            }
            
            return temp
        }

        // FALLBACK
        default: {
            console.log('BLOG REDUCER ERROR.')
            return state
        }
    }
}

export default blogs