// PEOPLE REDUCER
const people = (state, action) => {
    switch (action.type) {

        // OVERWRITE EXISTING STATE
        case 'overwrite': {
            return action.payload
        }

        // ADD PERSON
        case 'add': { return [
            ...state,
            action.payload
        ]}

        // FILTER OUT PERSON BY ID
        case 'reduce': {
            return state.filter(entry => entry._id !== action.payload)
        }

        // UPDATE EXISTING PERSON
        case 'update': {
            console.log('foo')

            // FIND THE OLD INDEX
            const temp = [...state]
            const index = temp.indexOf(action.target)

            // MERGE OLD AND NEW VALUES
            temp[index] = {
                ...temp[index],
                ...action.mods
            }
            
            return temp
        }

        // FALLBACK
        default: {
            console.log('PEOPLE REDUCER ERROR.');
            return state;
        }
    }
}

export default people;