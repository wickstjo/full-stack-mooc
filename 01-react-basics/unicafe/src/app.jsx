import './ui/styles.scss'
import { useState, Fragment, useEffect } from 'react';

import Form from './components/form'
import Button from './components/button'
import List from './components/list'

const App = () => {

    // COMPONENT DATA
    const [count, set_count] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
        total: 0
    })

    // VOTE STATISTICS
    const [stats, set_stats] = useState({
        positive: 0,
        average: 0
    })

    // UPDATE STATS WHEN COUNTS CHANGE
    useEffect(() => {
        if (count.total > 0) {
            set_stats({
                positive: ((count.good / count.total) * 100).toFixed(2) + '%',
                average: ((count.good - count.bad) / count.total).toFixed(2)
            })
        }
    }, [count])
  
    // INCREMENT CATEGORY COUNT
    const increment = (category) => {
        set_count({
            ...count,
            [category]: count[category] + 1,
            total: count.total + 1
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
            { count.total > 0 &&
                <Fragment>
                    <List
                        header={ 'votes' }
                        data={ count }
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