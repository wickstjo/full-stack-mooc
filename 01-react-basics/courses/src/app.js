import './ui/styles.scss'
import { useState } from 'react';

import Wrapper from './components/wrapper'
import Content from './components/content'
import Total from './components/total'

const App = () => {

    // COMPONENT DATA
    const [local] = useState({
        course: 'Half Stack application development',
        exercises: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    })

    // CUMULATIVE EXERCISE POINTS
    const cumulative = local.exercises.reduce(
        (a, b) => a + b.exercises, 0
    )
  
    return (
        <Wrapper header={ local.course }>
            <Content data={ local.exercises } />
            <Total points={ cumulative } />
        </Wrapper>
    )
}

export default App