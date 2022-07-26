import './prompt.scss'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Update from './windows/update'
import Create from './windows/create'
import Comment from './windows/comment'
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
        case 'create': { return <Create /> }
        case 'update': { return <Update /> }
        case 'comment': { return <Comment /> }

        // AUTH ACTIONS
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