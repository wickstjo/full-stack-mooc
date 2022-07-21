import * as Linking from 'expo-linking';
import styles from '../../styles/repos'

import Container from '../container'
import Details from './details'
import Ratings from './ratings'
import Button from '../inputs/button'

export default ({ item, github=false }) => {

    // GITHUB LINK
    const redirect = () => {
        Linking.openURL(`https://github.com/${ user }`) 
    }
    
    return (
        <Container>
            <Details
                id={ item.id }
                img={ item.ownerAvatarUrl }
                user={ item.fullName }
                lang={ item.language }
            />
            <Ratings item={ item } />
            { github &&
                <Button
                    style={{ marginTop: 5 }}
                    label={ 'Open in GitHub' }
                    func={ redirect }
                />
            }
        </Container>
    )
}