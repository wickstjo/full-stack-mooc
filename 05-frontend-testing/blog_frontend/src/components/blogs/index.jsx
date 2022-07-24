import Entry from './entry'
import { useSelector } from 'react-redux'
import useResource from '../../hooks/resource'

const Blogs = () => {

    // FETCH BLOGS
    useResource({
        url: 'http://localhost:3001/api/blogs',
        resource_name: 'blogs',
        fetch_data: true,
    })

    // RETRIEVE & SORT
    const { blogs } = useSelector(state => state.resources)
    const sorted = [...blogs].sort((a, b) => b.likes - a.likes)

    return sorted.map(blog =>
        <Entry
            blog={ blog }
            key={ blog.id }
        />
    )
}

export default Blogs