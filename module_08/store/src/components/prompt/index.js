import './prompt.scss'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CreateBook from './modules/create_book'
import UpdateBook from './modules/update_book'
import UpdateAuthor from './modules/update_author'

import Login from './modules/login'
import Register from './modules/register'

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
                <Swapper
                    state={ state }
                />
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
const Swapper = ({ state }) => {
    switch (state.window) {

        // BLOG ACTIONS
        case 'create_book': { return <CreateBook /> }
        case 'update_book': { return <UpdateBook /> }

        // AUTHOR ACTIONS
        case 'update_author': { return <UpdateAuthor /> }

        // AUTH
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