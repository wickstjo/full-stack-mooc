import { useState, useEffect } from 'react';
import { store as vote_store } from '../reducers/votes';

const Statistics = () => {

    // VOTE STATISTICS
    const [local, set_local] = useState({
        positive: undefined,
        average: undefined
    })

    // UPDATE STATS WHEN COUNTS CHANGE
    useEffect(() => {
        vote_store.subscribe(() => {

            // FETCH STATE
            const state = vote_store.getState()

            if (state.total > 0) {
                set_local({
                    positive: ((state.good / state.total) * 100).toFixed(2) + '%',
                    average: ((state.good - state.bad) / state.total).toFixed(2)
                })
            }
        })
    }, [])

    // CONDITIONAL RENDERING
    switch(local.positive) {

        // NO FEEDBACK YET
        case undefined: { return (
            <div>No feedback given.</div>
        )}

        // RENDER FEEDBACK
        default: { return (
            <table>
                { Object.keys(local).map(name =>
                    <Stat
                        key={ name }
                        name={ name }
                        value={ local[name] }
                    />
                )}
            </table>
        )}
    }
}

const Stat = ({ name, value }) => { return (
    <tbody>
        <tr>
            <td style={{ minWidth: '80px' }}>{ name }:</td>
            <td>{ value }</td>
        </tr>
    </tbody>
)}

export default Statistics;