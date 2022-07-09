import './styles.scss'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Update from './update_blog'

const Prompt = () => {

    // REDUX STUFF
    const dispatch = useDispatch()
    const state = useSelector(state => state.prompts)

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
                        dispatch({ type: 'hide' })
                    }}
                />
            </div>
        )}
    }
}

// CONTENT SWAPPER
const Swapper = ({ state }) => {
    switch (state.window) {

        // CREATE NEW BLOG
        case 'update_blog': {
            return <Update />
        }

        // OTHERWISE, RETURN NOTHING
        default: {
            console.log('UNKNOWN PROMPT WINDOW TYPE')
            return null
        }
    }
}

export default Prompt