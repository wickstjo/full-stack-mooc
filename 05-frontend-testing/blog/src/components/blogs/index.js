import './styles.scss'
import { useEffect, useState } from 'react'
import Entry from './entry'
import PropTypes from 'prop-types'

const Blogs = ({ data, user, actions }) => {

    // LIST OF SORTED BLOGS
    const [sorted, set_sorted] = useState([])

    // WHEN BLOG DATA CHANGES..
    useEffect(() => {

        // SORT BLOGS BY LIKES -- IN DESCENDING ORDER
        const temp = data.sort((a, b) => {
            return b.likes - a.likes
        })

        set_sorted(temp)
    }, [data])

    return (
        <div id={ 'container' }>
            <div>
                { sorted.map(blog =>
                    <Entry
                        blog={ blog }
                        actions={ actions }
                        user={ user }
                        key={ blog.id }
                    />
                )}
            </div>
        </div>
    )
}

Blogs.propTypes = {
    data: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
}

export default Blogs