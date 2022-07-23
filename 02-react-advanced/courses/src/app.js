import './ui/styles.scss'
import courses from './courses.json'
import Course from './components/course'

const App = () => { return (
    <div id={ 'main' }>
        { courses.map(course =>
            <Course
                key={ course.id }
                course={ course }
            />
        )}
    </div>
)}

export default App