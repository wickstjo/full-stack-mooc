const Content = ({ data }) => { return (
    data.map((course) =>
        <div key={ course.name }>
            <div>{ course.name }</div>
            <div>{ course.exercises }</div>
        </div>
    )
)}

export default Content