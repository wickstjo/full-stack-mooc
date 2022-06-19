import '../interface/prompt.scss'
import { useState, useEffect } from 'react'
import Login from './prompt/login'
import Register from './prompt/register'
import Create from './prompt/create_blog'
import Update from './prompt/update_blog'

const Prompt = ({ state, dispatch }) => {

    // VISIBILITY STATE
    const [style, set_style] = useState({
        display: 'none'
    })

    // WHEN THE STATE CHANGES, EVALUATE VISIBILITY
    useEffect(() => {
        set_style({
            display: state ? 'flex' : 'none'
        })
    }, [state])

    // HIDE PROMPT COMPONENT
    const hide_prompt = () => {
        dispatch({ type: 'hide' })
    }

    // CONDITIONAL RENDERING
    switch (state) {

        // WITH NO STATE, RENDER NOTHING
        case null: {
            return null
        }

        // OTHERWISE, RENDER PROMPT
        default: { return (
            <div id={ 'prompt' } style={ style }>
                <div id={ 'inner' }>
                    <Swapper state={ state } />
                </div>
                <span
                    id={ 'close' }
                    onClick={ hide_prompt }
                />
            </div>
        )}
    }
}

// CONTENT SWAPPER
const Swapper = ({ state }) => {
    switch (state.window) {

        // LOGIN WINDOW
        case 'login': {
            return <Login state={ state } />
        }

        // REGISTER WINDOW
        case 'register': {
            return <Register state={ state } />
        }

        // CREATE NEW BLOG
        case 'create_blog': {
            return <Create state={ state } />
        }

        // CREATE NEW BLOG
        case 'update_blog': {
            return <Update state={ state } />
        }

        // OTHERWISE, RETURN NOTHING
        default: {
            console.log('UNKNOWN PROMPT WINDOW TYPE')
            console.log(state)
            return null
        }
    }
}

export default Prompt