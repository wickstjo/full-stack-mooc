import styles from '../../styles/repos'
import { View } from 'react-native'
import Button from '../inputs/button'
import { useNavigate } from 'react-router-native';
import { useDispatch } from 'react-redux';

export default ({ item, refetch }) => {

    // EXTRACT URL PARAMS
    const navigator = useNavigate()
    const dispatch = useDispatch()

    const open_window = () => {
        dispatch({
            type: 'prompts/open',
            window: 'remove_review',
            review_id: item.id,
            refetch
        })
    }

    const redirect = () => {
        navigator(`/repos/${ item.repositoryId }`)
    }

    return (
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
    )
}