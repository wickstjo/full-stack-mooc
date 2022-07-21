import styles from '../../styles/repos'
import * as Linking from 'expo-linking';
import { useSelector, useDispatch } from 'react-redux'
import { View } from 'react-native'
import Button from '../inputs/button'
import { useParams } from 'react-router-native';

export default ({ owner }) => {

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    // EXTRACT URL PARAMS
    const params = useParams()

    // GITHUB LINK
    const redirect = () => {
        console.log('VIEW REPO')
        // Linking.openURL(`https://github.com/${ user }`) 
    }

    // OPEN PROMPT WINDOW
    const open_window = () => {
        console.log('REMOVE REVIEW')
    }

    // IF SESSION MATCHES 
    // switch (auth.username === owner) {
    switch (auth.session) {

        // RENDER BUTTONS
        case true: { return (
            <View style={ styles.buttons }>
                <Button
                    style={ styles.button }
                    label={ 'View Repo' }
                    func={ redirect }
                />
                <Button
                    style={[ styles.button, { marginLeft: 5 } ]}
                    label={ 'Remove' }
                    func={ open_window }
                />
            </View>
        )}

        // INACTIVE, RENDER NOTHING
        default: { return null }
    }
}