import React, { useState, Fragment } from 'react';

const App = () => {

    // COMPONENT DATA
    const [local] = useState({
        course: 'Half Stack application development',
        exercises: [
            ['Fundamentals of React', 10],
            ['Using props to pass data', 7],
            ['State of a component', 14]
        ]
    })

    // CUMULATIVE EXERCISE POINTS
    const cumulative = local.exercises.reduce(
        (partial, row) => partial + row[1], 0
    )
  
    return (
        <Fragment>
            <Header name={ local.course } />
            <Content data={ local.exercises } />
            <Total points={ cumulative } />
        </Fragment>
    )
}

const Header = ({ name }) => { return (
    <h1>{ name }</h1>
)}

const Content = ({ data }) => { return (
    data.map(row =>
        <Part
            name={ row[0] }
            points={ row[1] }
            key={ row[0] }
        />
    )
)}

const Part = ({ name, points }) => { return (
    <p>{ name } { points }</p>
)}

const Total = ({ points }) => { return (
    <p>Number of exercises { points }</p>
)}

export default App