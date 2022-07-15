import { Link } from 'react-router-dom'
import { all_authors } from '../models'
import { useQuery } from '@apollo/client'

import Wrapper from '../components/wrapper'

const Authors = () => {

    // APOLLO HOOK
    const target = 'allAuthors'
    const result = useQuery(all_authors)

    // DONE LOADING
    if (!result.loading && result.data[target]) {
        
        // SHORTHAND
        const data = result.data[target]
        
        switch (data.length) {

            // NO DATA
            case 0: { return (
                <Wrapper header={ 'all books' }>
                    <div>There are currently no authors available.</div>
                </Wrapper>
            )}

            // RENDER NORMALLY
            default: { return (
                <Wrapper header={ `all authors (${ result.data[target].length })` }>
                    { result.data[target].map(item =>
                        <div key={ item.id }>
                            <div><Link to={ `/authors/${ item.id }` }>{ item.name }</Link></div>
                            <div>{ item.born }</div>
                        </div>
                    )}
                </Wrapper>
            )}
        }
    }
}

export default Authors