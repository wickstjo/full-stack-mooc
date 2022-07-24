import './prompt.scss'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CreateBlog from './windows/create_blog'
import UpdateBlog from './windows/update_blog'
import Login from './windows/login'
import Register from './windows/register'

const Prompt = () => {

    // REDUX STUFF
    const dispatch = useDispatch()
    const prompt = useSelector(state => state.prompts)

    // VISIBILITY STATE
    const [style, set_style] = useState({
        display: 'none',
    })

    // WHEN THE STATE CHANGES, EVALUATE VISIBILITY
    useEffect(() => {
        set_style({
            display: prompt ? 'flex' : 'none',
        })
    }, [prompt])

    // CONDITIONAL RENDERING
    switch (prompt) {

        // WITH NO PROMPT STATE, RENDER NOTHING
        case null: {
            return null
        }

        // OTHERWISE, RENDER REQUESTED PROMPT
        default: { return (
            <div id={ 'prompt' } style={ style }>
                <Swapper window={ prompt.window } />
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

        // WHITELISTED PROMPTS
        case 'login': { return <Login /> }
        case 'register': { return <Register /> }
        case 'create_blog': { return <CreateBlog /> }
        case 'update_blog': { return <UpdateBlog /> }

        // OTHERWISE, RETURN NOTHING
        default: {
            console.log('UNKNOWN PROMPT WINDOW TYPE')
            return null
        }
    }
}

export default Prompt