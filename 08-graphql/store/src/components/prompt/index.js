import './prompt.scss'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CreateBook from './windows/create_book'
import UpdateBook from './windows/update_book'
import UpdateAuthor from './windows/update_author'
import UpdateUser from './windows/update_user'
import Login from './windows/login'
import Register from './windows/register'

const Prompt = () => {

    // REDUX STUFF
    const dispatch = useDispatch()
    const state = useSelector(state => state.prompts)

    // VISIBILITY STATE
    const [style, set_style] = useState({
        display: 'none',
    })

    // WHEN THE STATE CHANGES, EVALUATE VISIBILITY
    useEffect(() => {
        set_style({
            display: state ? 'flex' : 'none',
        })
    }, [state])

    // CONDITIONAL RENDERING
    switch (state) {

        // WITH NO PROMPT STATE, RENDER NOTHING
        case null: {
            return null
        }

        // OTHERWISE, RENDER REQUESTED PROMPT
        default: { return (
            <div id={ 'prompt' } style={ style }>
                <Swapper window={ state.window } />
                <span
                    id={ 'close' }
                    onClick={() => {
                        dispatch({ type: 'prompts/hide' })
                    }}
                />
            </div>
        )}
    }
}

// LOAD IN CORRECT MODULE
const Swapper = ({ window }) => {
    switch (window) {

        case 'create_book': { return <CreateBook /> }

        case 'update_book': { return <UpdateBook /> }
        case 'update_author': { return <UpdateAuthor /> }
        case 'update_user': { return <UpdateUser /> }

        case 'login': { return <Login /> }
        case 'register': { return <Register /> }
        
        // OTHERWISE, RETURN NOTHING
        default: {
            console.log('UNKNOWN PROMPT WINDOW TYPE')
            return null
        }
    }
}

export default Prompt