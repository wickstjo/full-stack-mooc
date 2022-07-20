import { Text } from 'react-native'
import styles from '../styles/general'
import Container from './container'
import Header from './header'

export default ({ errors }) => {

    // REMOVE MARGIN FROM LAST CHILD
    const margin_fix = (current) => {
        return current === (errors.length-1) ? { marginBottom: '0px' } : null
    }

    switch (errors.length > 0) {

        // RENDER ERRORS
        case true: { return (
            <Container>
                <Header text={ 'Problems' } />
                { errors.map((error, index) =>
                    <Text key={ error } style={[ styles.error, margin_fix(index) ]}>{ error }</Text>
                )}
            </Container>
        )}

        // FALLBACK, RENDER NOTHING
        default: {
            return null
        }
    }
}