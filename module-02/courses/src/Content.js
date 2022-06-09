import { Fragment } from 'react';

const Content = ({ data }) => {

    // COMPUTE CUMULATIVE EXERCISES
    const n_exercises = data.reduce((partial, a) => partial + a.exercises, 0)
    
    return (
        <Fragment>
            { data.map(row => 
                <Part
                    key={ row.id }
                    details={ row }
                />
            )}
            <br />
            <div><b>Total of { n_exercises } exercises.</b></div>
        </Fragment>
    )
}

const Part = ({ details }) => { return (
    <div>{ details.name } { details.exercises }</div>
)}

export default Content;