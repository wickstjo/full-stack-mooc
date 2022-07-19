import React from 'react';
import Header from './components/header';
import Content from './components/content';
import Total from './components/total';
import { Course } from './types';

const App = () => {

    const courseName = "Half Stack application development";

    const courseParts: Course[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is the leisured course part",
            type: "normal"
        },
        {
            name: "Advanced",
            exerciseCount: 7,
            description: "This is the harded course part",
            type: "normal"
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3,
            type: "groupProject"
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
            type: "submission"
        },
        {
            name: "Backend development",
            exerciseCount: 21,
            description: "Typing the backend",
            requirements: ["nodejs", "jest"],
            type: "special"
        }
    ];

    const exercise_count = courseParts.reduce((a, b) => a + b.exerciseCount, 0);
    
    return (
        <div>
            <Header text={ courseName } />
            <Content parts={ courseParts } />
            <Total count={ exercise_count } />
        </div>
    )
};
  
export default App;