import styles from '../../styles/prompt'
import { View, Image, Text, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cross from './close.png'

import Login from './windows/login'
import Register from './windows/register'
import AddReview from './windows/add_review'

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
            <View style={[ styles.container, style ]}>
                <View style={ styles.wrapper }>
                    <Swapper window={ state.window } />
                </View>
                <Pressable style={ styles.close } onPress={() => dispatch({ type: 'prompts/hide' }) }>
                    <Image
                        style={ styles.cross }
                        source={ Cross }
                        onPress={() => {
                            dispatch({ type: 'prompts/hide' })
                        }}
                    />
                </Pressable>
            </View>
        )}
    }
}

// LOAD IN CORRECT MODULE
const Swapper = ({ window }) => {
    switch (window) {

        case 'login': { return <Login /> }
        case 'register': { return <Register /> }
        case 'add_review': { return <AddReview /> }
        // case 'register': { return <Register /> }
        
        // OTHERWISE, RETURN NOTHING
        default: {
            console.log('UNKNOWN PROMPT WINDOW TYPE')
            return null
        }
    }
}

export default Prompt