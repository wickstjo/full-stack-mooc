import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { one_author } from '../models'
import { useQuery } from '@apollo/client'

import { Button } from '../components/inputs'
import Wrapper from '../components/wrapper'

const Author = () => {

    // AUXILLARY
    const dispatch = useDispatch()
    const params = useParams()
    const target = 'findAuthor'

    // APOLLO HOOK
    const result = useQuery(one_author(params.id))

    // OPEN PROMPT WINDOW
    const update = () => {
        dispatch({
            type: 'prompts/update_author',
            author: result.data[target],
            id: params.id
        })
    }

    // DONE LOADING
    if (!result.loading && result.data[target]) { return (
        <Wrapper header={ 'author' }>
            <div>
                <div>Name:</div>
                <div>{ result.data[target].name }</div>
            </div>
            { result.data[target].born ?
                <div>
                    <div>Born:</div>
                    <div>{ result.data[target].born }</div>
                </div>
            : null }
            <Button
                label={ 'update' }
                func={ update }
            />
        </Wrapper>
    )}

    // FALLBACK
    return (
        <Wrapper header={ 'error' }>
            <div>Data could not be retrieved.</div>
        </Wrapper>
    )
}

export default Author