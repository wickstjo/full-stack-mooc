import Wrapper from './wrapper'

const Course = ({ course }) => {

    // CUMULATIVE EXERCISE POINTS
    const cumulative = course.parts.reduce(
        (a, b) => a + b.exercises, 0
    )
  
    return (
        <Wrapper header={ course.name }>
            { course.parts.map(part =>
                <div key={ part.id }>
                    <div>{ part.name }</div>
                    <div>{ part.exercises }</div>
                </div>
            )}
            <div id={ 'total' }>
                <div>Total number of exercises:</div>
                <div>{ cumulative }</div>
            </div>
        </Wrapper>
    )
}

export default Course