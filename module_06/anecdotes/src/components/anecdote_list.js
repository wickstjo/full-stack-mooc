import { Fragment, useState, useEffect } from 'react'
import { store } from '../reducers/anecdote_reducer'

import Header from './header'
import { Button } from './inputs'

const Anecdotes = () => {

    // FETCH & SORT ANECDOTES FROM REDUX
    const fetch_and_sort = () => {
        const state = store.getState().sort((a, b) => b.votes - a.votes)
        const sorted = state.sort((a, b) => b.votes - a.votes)
        
        return sorted
    }

    // LOCAL STATE
    const [data, set_data] = useState([
        ...fetch_and_sort()
    ])

    // WHEN ANECDOTATE STATE CHANGE, UPDATE
    useEffect(() => {
        store.subscribe(() => {
            set_data([
                ...fetch_and_sort()
            ])
        })
    }, [])

    return (
        <Fragment>
            <Header text={ 'Anecdotes' } />
            { data.map((item, index) =>
                <Fragment key={ `${ item.name }-${ index }` }>
                    <div>{ item.text }</div>
                    <div>Has { item.votes } votes!</div>
                    <Button
                        label={ 'Vote for' }
                        func={() => {
                            store.dispatch({
                                type: 'vote',
                                id: index
                            })
                        }}
                    />
                    <br />
                </Fragment>
            )}
        </Fragment>
    )
}

export default Anecdotes