import { Link } from 'react-router-dom'
import { throttle } from '../misc'

import { all_books } from '../models'
import { useQuery } from '@apollo/client'

import Wrapper from '../components/wrapper'

const Books = () => {

    // APOLLO HOOK
    const target = 'allBooks'
    const result = useQuery(all_books)

    // DONE LOADING
    if (!result.loading && result.data[target]) {

        // SHORTHAND
        const data = result.data[target]
        
        switch (data.length) {

            // NO DATA
            case 0: { return (
                <Wrapper header={ 'all books' }>
                    <div>There are currently no books available.</div>
                </Wrapper>
            )}

            // RENDER NORMALLY
            default: { return (
                <Wrapper header={ `all books (${ result.data[target].length })` }>
                    { result.data[target].map(item =>
                        <div key={ item.id }>
                            <div><Link to={ `/books/${ item.id }` }>{ throttle(item.title, 50) }</Link></div>
                            <div>{ item.published }</div>
                        </div>
                    )}
                </Wrapper>
            )}
        }
    }

    // FALLBACK
    return (
        <Wrapper header={ 'error' }>
            <div>Data could not be retrieved.</div>
        </Wrapper>
    )
}

export default Books