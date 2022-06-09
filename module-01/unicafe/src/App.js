import { useState, Fragment, useEffect } from 'react';

const App = () => {

    // COMPONENT DATA
    const [count, set_count] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
        total: 0
    })

    // INCREMENT CATEGORY COUNT
    const increment = (category) => {
        set_count({
            ...count,
            [category]: count[category] + 1,
            total: count.total + 1
        })
    }

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
  
    return (
        <Fragment>
            <Header
                text={ 'Give Feedback' }
            />
            <Buttons
                keys={[
                    'good',
                    'neutral',
                    'bad'
                ]}
                increment={ increment }
            />
            <Header
                text={ 'Statistics' }
            />
            <Statistics
                data={{
                    ...count,
                    ...stats
                }}
            />
        </Fragment>
    )
}

const Header = ({ text }) => { return (
    <h1>{ text }</h1>
)}

const Buttons = ({ keys, increment }) => { return (
    keys.map((name, index) =>
        <Button
            label={ name }
            func={ () => increment(name) }
            key={ index }
        />
    )
)}

const Button = ({ label, func }) => { return (
    <button onClick={ func }>{ label }</button>
)}

const Statistics = ({ data }) => {
    switch(data.total) {

        // NO FEEDBACK YET
        case 0: { return (
            <div>No feedback given.</div>
        )}

        // RENDER FEEDBACK
        default: { return (
            <table>
                { Object.keys(data).map((name, index) =>
                    <Stat
                        key={ index }
                        name={ name }
                        value={ data[name] }
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

export default App