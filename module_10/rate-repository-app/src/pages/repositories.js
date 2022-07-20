import { FlatList } from 'react-native'
import { Fragment } from 'react'

import Container from '../components/container'
import Details from '../components/repos/details'
import Ratings from '../components/repos/ratings'
import Filter from '../components/filter'
import useField from '../components/inputs/hook'

import repositories from '../repositories.json'

export default () => {

    // REPO FILTER
    const filter = useField({
        placeholder: 'Filter by repository name'
    })

    return (
        <Fragment>
            <Filter field={ filter } />
            <FlatList
                data={ repositories }
                renderItem={ Item }
            />
        </Fragment>
    )
}

const Item = ({ item }) => { return (
    <Container>
        <Details
            img={ item.ownerAvatarUrl }
            user={ item.fullName }
            lang={ item.language }
        />
        <Ratings item={ item } />
    </Container>
)};