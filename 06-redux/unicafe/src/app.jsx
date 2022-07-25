import './ui/styles.scss'
import { useState, Fragment, useEffect } from 'react';
import { store as vote_store } from './redux/votes'

import Form from './components/form'
import Button from './components/button'
import List from './components/list'

const App = () => {

    const votes = vote_store.getState()

    // VOTE STATISTICS
    const [stats, set_stats] = useState({
        positive: 0,
        average: 0
    })

    // UPDATE STATS WHEN COUNTS CHANGE
    useEffect(() => {
        vote_store.subscribe(() => {

            // FETCH STATE
            const state = vote_store.getState()

            if (state.total > 0) {
                set_stats({
                    positive: ((state.good / state.total) * 100).toFixed(2) + '%',
                    average: ((state.good - state.bad) / state.total).toFixed(2)
                })
            }
        })
    }, [])
  
    // INCREMENT CATEGORY COUNT
    const increment = (category) => {
        vote_store.dispatch({
            type: category
        })
    }

    return (
        <div id={ 'main' }>
            <Form header={ 'Give feedback' }>
                <Button
                    label={ 'Good' }
                    func={ () => increment('good') }
                />
                <Button
                    label={ 'Neutral' }
                    func={ () => increment('neutral') }
                    id={ 'yellow' }
                />
                <Button
                    label={ 'Bad' }
                    func={ () => increment('bad') }
                    id={ 'red' }
                />
            </Form>
            { votes.total > 0 &&
                <Fragment>
                    <List
                        header={ 'votes' }
                        data={ votes }
                    />
                    <List
                        header={ 'statistics' }
                        data={ stats }
                    />
                </Fragment>
            }
        </div>
    )
}

export default App