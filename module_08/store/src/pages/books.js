import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BOOKS } from '../models'
import useExtract from '../hooks/extractor'

import Wrapper from '../components/wrapper'
import Filter from '../components/filter'
import Content from '../components/content'

const Books = () => {
    
    // FILTER STATE
    const filter = useSelector(state => state.filter)

    // APOLLO QUERY
    const [data, config] = useExtract(BOOKS, {
        genre: filter
    })

    return (
        <Content payload={ config } verify={ false }>
            <Filter />
            <Wrapper header={ `all books (${ data.length })` }>
                <Swapper data={ data } />
            </Wrapper>
        </Content>
    )
}

// SEARCH RESULT SWAPPER
const Swapper = ({ data }) => {
    switch (data.length) {
        case 0: { return (
            <div>Sorry, no books found.</div>
        )}

        default: { return (
            data.map(item =>
                <div key={ item.id }>
                    <div><Link to={ `/books/${ item.id }` }>{ item.title }</Link></div>
                    <div>{ item.published }</div>
                </div>
            )
        )}
    }
}

export default Books